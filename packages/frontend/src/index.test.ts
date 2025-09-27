import { describe, it, expect, vi } from 'vitest';
import { cleanQuery } from "./utils/cleanQuery";

describe('cleanQuery', () => {
  it('returns empty string for empty input', () => {
    expect(cleanQuery('')).toBe('');
  });

  it('removes a bare row filter', () => {
    expect(cleanQuery('row.id.gt:123')).toBe('');
  });

  it('removes leading \"and row.id.gt:<n>\"', () => {
    expect(cleanQuery('and row.id.gt:1')).toBe('');
  });

  it('removes \"row.id.gt:<n> and \" and trims', () => {
    expect(cleanQuery('row.id.gt:1 and ')).toBe('');
  });

  it('removes trailing \"and row.id.gt:<n>\" with preceding text', () => {
    expect(cleanQuery('foo and row.id.gt:2')).toBe('foo');
  });

  it('removes leading \"row.id.gt:<n> and\" with following text', () => {
    expect(cleanQuery('row.id.gt:2 and bar')).toBe('bar');
  });

  it('removes middle filter between terms (note: double space remains by design)', () => {
    expect(cleanQuery('foo and row.id.gt:2 and bar')).toBe('foo  and bar');
  });

  it('removes standalone filter within text (double space remains)', () => {
    expect(cleanQuery('foo row.id.gt:2 bar')).toBe('foo  bar');
  });

  it('removes multiple filters', () => {
    expect(cleanQuery('and row.id.gt:2 and row.id.gt:3')).toBe('');
    expect(cleanQuery('a and row.id.gt:2 and b and row.id.gt:3')).toBe('a  and b');
  });

  it('leaves unrelated queries alone (except trimming)', () => {
    expect(cleanQuery(' status:200 ')).toBe('status:200');
  });

  it('removes filter at the end but preserves trailing \"and\" (as implemented)', () => {
    expect(cleanQuery('foo and row.id.gt:100 and')).toBe('foo  and');
  });
});