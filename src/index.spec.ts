import { parseTextBotCommand } from './index';
import { Group } from './interfaces';

describe('parseTextBotCommand', () => {
  const testGroups: Group[] = [
    { id: '1', name: 'test' },
    { id: '2', name: 'test copy' },
    { id: '3', name: 'hotline 1' },
    { id: '4', name: 'support team' },
    { id: '5', name: 'all' }
  ];

  it('should return null for invalid inputs', () => {
    expect(parseTextBotCommand('', testGroups)).toBeNull();
    expect(parseTextBotCommand('not txt', testGroups)).toBeNull();
    expect(parseTextBotCommand('txt', testGroups)).toBeNull();
    expect(parseTextBotCommand('txt ', testGroups)).toBeNull();
    expect(parseTextBotCommand('txt', [])).toBeNull();
    expect(parseTextBotCommand('txt', null as any)).toBeNull();
    expect(parseTextBotCommand(null as any, testGroups)).toBeNull();
  });

  it('should handle basic group matching', () => {
    const result = parseTextBotCommand('txt test Hello world', testGroups);
    expect(result).toEqual({
      groupId: '1',
      messageToSend: 'Hello world'
    });
  });

  it('should handle whitespace in group names', () => {
    const result = parseTextBotCommand('txt   hotline  1   Hello world', testGroups);
    expect(result).toEqual({
      groupId: '3',
      messageToSend: 'Hello world'
    });
  });

  it('should handle case insensitivity', () => {
    const result = parseTextBotCommand('txt TEST Hello world', testGroups);
    expect(result).toEqual({
      groupId: '1',
      messageToSend: 'Hello world'
    });
  });

  it('should select the longest matching group', () => {
    const result = parseTextBotCommand('txt test copy Hello world', testGroups);
    expect(result).toEqual({
      groupId: '2',
      messageToSend: 'Hello world'
    });
  });

  it('should handle multiple word group names', () => {
    const result = parseTextBotCommand('txt support team Hello world', testGroups);
    expect(result).toEqual({
      groupId: '4',
      messageToSend: 'Hello world'
    });
  });

  it('should handle empty messages', () => {
    const result = parseTextBotCommand('txt test ', testGroups);
    expect(result).toEqual({
      groupId: '1',
      messageToSend: ''
    });
  });

  it('should preserve message content exactly', () => {
    const result = parseTextBotCommand('txt test   Hello   world  ', testGroups);
    expect(result).toEqual({
      groupId: '1',
      messageToSend: 'Hello   world'
    });
  });

  it('should handle special characters in messages', () => {
    const result = parseTextBotCommand('txt test Hello! @#$%^&*() world', testGroups);
    expect(result).toEqual({
      groupId: '1',
      messageToSend: 'Hello! @#$%^&*() world'
    });
  });

  it('should handle very long messages', () => {
    const longMessage = 'a'.repeat(1000);
    const result = parseTextBotCommand(`txt test ${longMessage}`, testGroups);
    expect(result).toEqual({
      groupId: '1',
      messageToSend: longMessage
    });
  });

  it('should handle group names with special characters', () => {
    const specialGroups: Group[] = [
      { id: '6', name: 'test@group' },
      { id: '7', name: 'test#group' }
    ];
    const result = parseTextBotCommand('txt test@group Hello world', specialGroups);
    expect(result).toEqual({
      groupId: '6',
      messageToSend: 'Hello world'
    });
  });

  it('should handle overlapping group names', () => {
    const overlappingGroups: Group[] = [
      { id: '8', name: 'test group' },
      { id: '9', name: 'test group special' }
    ];
    const result = parseTextBotCommand('txt test group special Hello world', overlappingGroups);
    expect(result).toEqual({
      groupId: '9',
      messageToSend: 'Hello world'
    });
  });
}); 