import { prisma } from "../../data/postgres";
import { AuthDatasource, CreateUserDto, CustomError, UserEntity, ValidateLoginDto } from "../../domain";
import { checkPassword, hashPassword } from "../../utils/auth";
import { generateJWT } from "../../utils/jwt";
import { generateToken } from "../../utils/token";
import { AuthEmail } from "../emails/AuthEmail";


export class AuthDatsourceImpl implements AuthDatasource {

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  async createToken(userId: string) {
    return await prisma.token.create({
      data: {
        token: generateToken(),
        userId
      }
    });
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(createUserDto.email);
    if(userExists) throw new CustomError(`Already exists a user with email: ${userExists.email}`, 409)
    createUserDto.password = await hashPassword(createUserDto.password);
    const user = await prisma.user.create({
      data: createUserDto
    })

    const token = await this.createToken(user.id)

    AuthEmail.sendConfirmationEmail({
      email: user.email,
      name: user.name,
      token: token.token
    })

    return user;
  }

  async deleteToken(tokenId: string) {
    await prisma.token.delete({ where: { id: tokenId } })
  }

  async confirm(token: string): Promise<UserEntity> {
    const tokenExists = await prisma.token.findFirst({
      where: { token }
    })

    if (!tokenExists) throw new CustomError(`Token not found`, 404)
    if (tokenExists.expires_at < new Date()) {
      this.deleteToken(tokenExists.id);
      throw new CustomError(`Token not found`, 404)
    }

    const user = await prisma.user.update({
      where: { id: tokenExists.userId },
      data: {
        confirmed: true,
      }
    })

    this.deleteToken(tokenExists.id);
    return user;
  }

  async login(user: ValidateLoginDto): Promise<string> {
    const userExists = await this.findUserByEmail(user.email);
    if(!userExists) throw new CustomError(`Email or Password incorrect`, 404)
    if(!userExists.confirmed) {
      const token = await this.createToken(userExists.id);
      AuthEmail.sendConfirmationEmail({
        email: userExists.email,
        name: userExists.name,
        token: token.token
      })
      throw new CustomError(`Account not confirmed yet`, 401)
    }

    const isPasswordCorrect = await checkPassword(user.password, userExists.password);
    if(!isPasswordCorrect) throw new CustomError(`Email or Password incorrect`, 404)

    const token = generateJWT({id: userExists.id});
    
    return token;
  }

  async confirmationCode(email: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if(!user) throw new CustomError(`Not exists a user with email: ${email}`, 404)
    if(user.confirmed) throw new CustomError(`User with email: ${user.email} is confirmed, you can login`, 409)
    const token = await this.createToken(user.id)

    AuthEmail.sendConfirmationEmail({
      email: user.email,
      name: user.name,
      token: token.token
    })
    
    return "Se envio un nuevo token a tu email"
  }
  
  async resetPassword(email: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if(!user) throw new CustomError(`Not exists a user with email: ${email}`, 404)
    const token = await this.createToken(user.id)
    AuthEmail.sendPasswordResetToken({
      email: user.email,
      name: user.name,
      token: token.token
    })

    return "Revisa tu e-mail para instrucciones";
  }

  async validateToken(token: string): Promise<string> {
    const tokenExists = await prisma.token.findFirst({
      where: { token }
    })

    if (!tokenExists) throw new CustomError(`Token not found`, 404)
    if (tokenExists.expires_at < new Date()) {
      await this.deleteToken(tokenExists.id);
      throw new CustomError(`Token not found`, 404)
    }

    return 'Token válido, define tu nuevo password';
  }

  async updatePassword(token: string, password: string): Promise<string> {
    const tokenExists = await prisma.token.findFirst({
      where: { token }
    })

    if (!tokenExists) throw new CustomError(`Token not found`, 404)
    if (tokenExists.expires_at < new Date()) {
      await this.deleteToken(tokenExists.id);
      throw new CustomError(`Token not found`, 404)
    }

    await prisma.user.update({
      where: { id: tokenExists.userId },
      data: {
        password: await hashPassword(password)
      }
    })
    await this.deleteToken(tokenExists.id);

    return 'El password se modifico correctamente';
  }

  async updateProfile(id: string,name: string, email: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (user && user.id !== id) {
      throw new CustomError(`Este email ya esta registrado`, 409);
    }
    await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email
      }
    });

    return "Perfil actualizado correctamente"
  }

  async changePassword(id: string, current_password: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    const isPasswordCorrect = await checkPassword(current_password, user!.password)
    if (!isPasswordCorrect) {
      throw new CustomError(`El password actual es incorrecto`, 401);
    }

    await prisma.user.update({
      where: { id: user!.id },
      data: {
        password: await hashPassword(password)
      }
    })

    return "El password se modifico correctamente";
  }

}