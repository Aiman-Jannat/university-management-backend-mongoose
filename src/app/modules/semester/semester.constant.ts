import { TMonth, TSemesterCode, TSemesterName, TSemesterNameCodeMapper } from './semester.interface'

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const SemesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall']
export const SemesterCode: TSemesterCode[] = ['01', '02', '03']

export const SemesterCodeNameMapper:TSemesterNameCodeMapper={
    Autumn:'01',
    Summer:'02',
    Fall:'03'
}