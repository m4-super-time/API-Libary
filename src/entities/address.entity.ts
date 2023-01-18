import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity("addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  number?: string;

  @Column({ nullable: true })
  neighborhood?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToOne(() => User, (user) => user.addresses)
  @JoinColumn()
  user: User;
}
