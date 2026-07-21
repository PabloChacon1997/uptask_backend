export class ValidateLoginDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(props: {[key: string]: any}): [string, undefined] | [undefined, ValidateLoginDto] {
    const { password, email} = props;
    if (!password || password.length === 0) return ['Password property is required', undefined];
    if (!email || email.length === 0) return ['Email property is required', undefined];
    if (!email.includes('@')) return ['Email not valid', undefined];
    return [undefined, new ValidateLoginDto(email, password)]
  }
  
  static validatePassword(props: {[key: string]: any}): [string, undefined] | [undefined, string] {
    const { password , password_confirmation} = props;
    if (!password || password.length === 0) return ['Password property is required', undefined];
    if (password.length < 8) return ['Password is sort,should be min 8 characters', undefined];
    if (password !== password_confirmation) return ['Passwords not equal', undefined];
    return [undefined, password]
  }
}