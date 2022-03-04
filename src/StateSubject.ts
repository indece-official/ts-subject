import { Subject } from './Subject';


export class StateSubject<T> extends Subject<T>
{
    private _currentValue: T;


    constructor ( initialValue: T )
    {
        super();

        this._currentValue = initialValue;
    }


    public next ( value: T ): void
    {
        this._currentValue = value;

        super.next(value);
    }


    public get ( ): T
    {
        return this._currentValue;
    }
}
