export class CreateUserDto {
  private constructor(
    public readonly email: string,
    public password: string,
    public readonly name: string,
  ) {}

  static create(props: {[key: string]: any}): [string, undefined] | [undefined, CreateUserDto] {
    const { name, password,password_confirmation, email} = props;
    if (!name || name.length === 0) return ['Name property is required', undefined];
    if (!password || password.length === 0) return ['Password property is required', undefined];
    if (password.length < 8) return ['Password is sort,should be min 8 characters', undefined];
    if (password !== password_confirmation) return ['Passwords not equal', undefined];
    if (!email || email.length === 0) return ['Email property is required', undefined];
    if (!email.includes('@')) return ['Email not valid', undefined];
    return [undefined, new CreateUserDto(email, password, name)]
  }
}