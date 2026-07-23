import { titlecasePipe } from './texto-format-pipe';

describe('titlecasePipe', () => {
  it('create an instance', () => {
    const pipe = new titlecasePipe();
    expect(pipe).toBeTruthy();
  });
});
