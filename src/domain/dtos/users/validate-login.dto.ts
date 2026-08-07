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
  
  static validateEmail(props: {[key: string]: any}): [string, undefined] | [undefined, string] {
    const { email } = props;
    if (!email || email.length === 0) return ['Email property is required', undefined];
    if (!email.includes('@')) return ['Email not valid', undefined];
    return [undefined, email]
  }
  
  static validateProfile(props: {[key: string]: any}): [string, undefined] | [undefined, {name: string, email: string}] {
    const { name, email } = props;
    if (!name || name.length === 0) return ['Name property is required', undefined];
    if (!email || email.length === 0) return ['Email property is required', undefined];
    if (!email.includes('@')) return ['Email not valid', undefined];
    return [undefined, {name, email}]
  }

  static validateNewPassword(props: {[key: string]: any}): [string, undefined] | [undefined, {current_password: string,password: string}] {
    const { current_password,password , password_confirmation} = props;
    if (!current_password || current_password.length === 0) return ['Current Password property is required', undefined];
    if (!password || password.length === 0) return ['Password property is required', undefined];
    if (password.length < 8) return ['Password is sort,should be min 8 characters', undefined];
    if (password !== password_confirmation) return ['Passwords not equal', undefined];
    return [undefined, {current_password, password}]
  }
}