export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateProductParams = {
  name: string;
  price: number;
  quantity: number;
  active: boolean;
};


export type UpdateProductParams = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  active: boolean;
};
