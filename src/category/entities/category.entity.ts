import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn({type: 'int', generated: true})
    id : number;

    @Column()
    name : string;

    @Column()
    image_link : string;

    @CreateDateColumn()
    date_created : string;

    @CreateDateColumn()
    date_updated : string;
}
