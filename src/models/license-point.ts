import { Link } from './link';

export class LicensePoint {
  public readonly segments: Link;
  public readonly sessions: Link;

  constructor(segments: Link, sessions: Link) {
    this.segments = segments;
    this.sessions = sessions;
  }
}
