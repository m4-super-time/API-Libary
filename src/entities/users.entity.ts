import { hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from "typeorm";

@Entity ("users")
class User { 
    
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({ length: 120 })
    name:string;

    @Column({  length: 120, unique: true })
    email:string;

    @Column({default: true})
    isActive: boolean;
   
    @Column({default: false})
    isEmployee: boolean;
    
    @Column({ length: 120 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;     
  
    @UpdateDateColumn  ()
    updatedAt: Date;

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password=hashSync(this.password,10)
    }
    
}

export { User }