import { DragEventCounter } from './drag-event-counter';

describe('Model: DragEventCounter', () => {

  it('should be 0 after increment and decrement ', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(0);
  });

  it('first event should be true if inc is called once', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });

  it('first event should be false if inc is called multiple times', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('last event should be false if dec has never been called', () => {
    const dragEventCounter = new DragEventCounter();
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('last event should be true if inc and dec has been called the same time', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    dragEventCounter.dec('a1');
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });

  it('last event should be false if inc and dec has been called differnt times', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('should be 0 after decrement and increment ', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.dec('a1');
    dragEventCounter.inc('a1');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(0);
  });

  it('should increment correctly  with different ids', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a2');
    const expectedA1Value: number = 2;
    const expectedA2Value: number = 1;
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(expectedA1Value);
    expect(dragEventCounter.dragEventCountMap['a2']).toEqual(expectedA2Value);
  });

  it('should reset counter to 0 ', () => {
    const dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    let expectedValue: number = 3;
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(expectedValue);
    dragEventCounter.reset('a1');
    expectedValue = 0;
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(expectedValue);
  });

});
