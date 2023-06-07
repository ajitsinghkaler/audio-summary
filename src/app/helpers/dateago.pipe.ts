import { Pipe, PipeTransform } from '@angular/core';
import { fromNow } from './dateago';

@Pipe({
  name: 'dateago',
  standalone: true,
  pure: true
})
export class DateagoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return fromNow(value);
  }

}
