export interface Message {
  type: string,
  text: string,
}

export interface Action {
  name: string,
  handler: () => void | null
}
