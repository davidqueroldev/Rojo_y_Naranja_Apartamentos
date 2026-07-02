declare module 'react-big-calendar/lib/localizers/date-fns' {
  import type { DateLocalizer } from 'react-big-calendar'

  interface DateFnsLocalizerConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    format: (...args: any[]) => string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parse: (...args: any[]) => Date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    startOfWeek: (...args: any[]) => Date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDay: (...args: any[]) => number
    locales: Record<string, unknown>
  }

  function dateFnsLocalizer(config: DateFnsLocalizerConfig): DateLocalizer
  export default dateFnsLocalizer
}
