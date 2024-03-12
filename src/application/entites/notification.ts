import { randomUUID } from "crypto"
import { Replace } from "../../helps/Replace"

interface INotification {
    urlImg?: string | null
    text: string
    link: string
    tipo: string
    check?: boolean
    createAt: Date
}

export class Notification {
    private _id: string
    private props: INotification

    constructor(props: Replace<INotification, {createAt?: Date}>) {
        this._id = randomUUID()
        this.props = {
            ...props,
            createAt: props.createAt ?? new Date(),
        }
    }

    public get id() {
        return this._id
    }

    public set urlImg(urlImg: string | null | undefined) {
      this.props.urlImg = urlImg
    }
  
    public get urlImg(): string | null | undefined {
      return this.props.urlImg
    }

    public set text(text: string) {
        this.props.text = text
      }
    
      public get text() {
        return this.props.text
      }

      public set link(link: string) {
        this.props.link = link
      }
    
      public get link() {
        return this.props.link
      }

      public set tipo(tipo: string) {
        this.props.tipo = tipo
      }
    
      public get tipo() {
        return this.props.tipo
      }

      public set check(check: boolean | undefined) {
        if (check != true ) {
          this.props.check = false
        }
        this.props.check = check
      }
    
      public get check(): boolean | undefined {
        return this.props.check
      }

      public get createAt() {
        return this.props.createAt
      }
}