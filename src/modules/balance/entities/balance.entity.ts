import { Expose } from "class-transformer";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
          to: (value: number) => value, // When saving, keep it number
          from: (value: string) => parseFloat(value), // When reading, convert to number
        },
      })
    balance: number;

    @OneToOne(() => User, (user) => user.balance)
    @JoinColumn()
    user: User;
}
