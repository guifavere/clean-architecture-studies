import { uuid } from 'uuidv4';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string | number> {
  public constructor(id?: string | number) {
    super(id || uuid());
  }
}
