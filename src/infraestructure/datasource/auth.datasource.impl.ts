import { transporter } from "../../config/nodemailer";
import { prisma } from "../../data/postgres";
import { AuthDatasource, CreateUserDto, CustomError, UserEntity } from "../../domain";
import { generateToken } from "../../utils/token";


export class AuthDatsourceImpl implements AuthDatasource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await prisma.user.findUnique({ where: { email: createUserDto.email } })
    if(userExists) throw new CustomError(`Already exists a user with email: ${userExists.email}`, 409)
    const user = await prisma.user.create({
      data: createUserDto
    })

    await prisma.token.create({
      data: {
        token: generateToken(),
        userId: user.id
      }
    });

    await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Confirma tu cuenta',
      text: 'UpTask - Confirma tu cuenta',
      html: `<p></p>`
    })

    return user;
  }

}