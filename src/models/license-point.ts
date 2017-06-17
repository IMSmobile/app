import { Link } from './link';

export class LicensePoint {
  segments: Link;
  sessions: Link;

  constructor(segments: Link, sessions: Link) {
    this.segments = segments;
    this.sessions = sessions;
  }
}
