import { DragEventCounter } from './drag-event-counter';

describe('Model: DragEventCounter', () => {

  it('should be 0 after increment and decrement ', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(0);
  });

  it('first event should be true if inc is called once', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });

  it('first event should be false if inc is called multiple times', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    let called = false;
    dragEventCounter.callIfFirstEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('last event should be false if dec has never been called', () => {
    let dragEventCounter = new DragEventCounter();
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('last event should be true if inc and dec has been called the same time', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    dragEventCounter.dec('a1');
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeTruthy();
  });

  it('last event should be false if inc and dec has been called differnt times', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.dec('a1');
    let called = false;
    dragEventCounter.callIfLastEvent('a1', () => called = true);
    expect(called).toBeFalsy();
  });

  it('should be 0 after decrement and increment ', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.dec('a1');
    dragEventCounter.inc('a1');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(0);
  });

  it('should increment correctly  with different ids', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a2');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(2);
    expect(dragEventCounter.dragEventCountMap['a2']).toEqual(1);
  });

  it('should reset counter to 0 ', () => {
    let dragEventCounter = new DragEventCounter();
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    dragEventCounter.inc('a1');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(3);
    dragEventCounter.reset('a1');
    expect(dragEventCounter.dragEventCountMap['a1']).toEqual(0);
  });

});
