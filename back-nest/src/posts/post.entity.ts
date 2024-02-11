import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255 })
  title?: string;

  @Column('text')
  body?: string;

  @Column('int')
  createdBy?: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
