

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string,
    public confirmed: string,
  ) {}

  public static fromObject(object: {[key: string]: any}): UserEntity {
    const { id, email, password, name, confirmed } = object
    if(!id) throw 'Id is required';
    if(!email) throw 'Email is required';
    if(!password) throw 'Password is required';
    if(!name) throw 'Name is required';
    if(!confirmed) throw 'Confirmed is required';

    return new UserEntity(id, email, password, name, confirmed);
  }
}