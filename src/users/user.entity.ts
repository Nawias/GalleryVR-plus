import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id', 'googleId'])
export class User {
  constructor(
    googleId: number,
    firstName: string,
    lastName: string,
    email: string,
  ) {
    this.googleId = googleId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'googleId' })
  googleId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
}
