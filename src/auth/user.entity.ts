import { Apply } from 'src/meeting/apply.entity';
import { Meeting } from 'src/meeting/meeting.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('User')
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  originId: string;

  @OneToMany(() => Meeting, (meeting) => meeting.user, { eager: true })
  meetings: Meeting[];

  @ManyToMany(() => Apply, (apply) => apply.user)
  apply: Apply[];
}
