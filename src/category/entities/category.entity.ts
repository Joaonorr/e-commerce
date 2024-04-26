import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn({type: 'int', generated: true})
    id : number;

    @Column()
    name : string;

    @Column()
    image_link : string;

    @CreateDateColumn({type: 'timestamp'})
    date_created : string;

    @CreateDateColumn({type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP'})
    date_updated : string;
}
