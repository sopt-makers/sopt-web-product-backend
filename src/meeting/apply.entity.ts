import { User } from 'src/users/user.entity';
import { Meeting } from 'src/meeting/meeting.entity';

import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface ImageURL {
  id: number;
  url: string;
}

export interface AppliedInfo {
  user: User;
  appliedDate: Date;
  content: string;
}

@Entity('apply')
export class Apply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meeting, (meeting) => meeting.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  meeting: Meeting;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  user: User;

  @Column()
  content: string;

  @Column()
  appliedDate: Date;

  @Column({ default: 0 })
  status: number;

  static async createApply(user: User, content: string, meeting: Meeting) {
    const nowDate = new Date();
    return await this.create({
      user,
      content,
      appliedDate: nowDate,
      meeting,
    }).save();
  }
}
