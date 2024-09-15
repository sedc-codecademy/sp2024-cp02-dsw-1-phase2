import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentInfo {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        description: `Card ID`,
        example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc'
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: `Card name`,
        example: 'Jane Doe'
    })
    fullName: string;

    @Column()
    @ApiProperty({
        type: Number,
        description: `Card number`,
        example: '0123456789012345'
    })
    ccNum: number; 

    @Column()
    @ApiProperty({
        type: Number,
        description: `Card number`,
        example: '5678901234567890'
    })
    expDate: string; 

    @Column()
    @ApiProperty({
        type: Number,
        description: `CVV card number`,
        example: '123 or 1234'
    })
    cvv: number; 

    @OneToOne(() => User)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    userId: string; 
}