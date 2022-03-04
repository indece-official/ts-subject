# TS-Subject
Subject & StateSubject for common usage

## Installation
```
npm install --save ts-subject
```

or 

```
yarn add ts-subject
```

## Examples
### Simple

```
import { Subject } from 'ts-subject';

const subject = new Subject<string>();

function produce ( )
{
    subject.next('Test');
}

function consume ( )
{
    subject.subscribe(this, ( msg ) =>
    {
        console.log('Received: ' + msg);

        // Unsubscribe afterwards in this example
        subject.unsubscribe(this);
    });
}

function main ( )
{
    consume();
    produce();
}

main();
```

### React
```
import * as React from 'react';
import { StateSubject } from 'ts-subject';

interface MyService
{
    private static _instance: MyService;
    private _subjectLoggedin: StateSubject<bool>;

    public static getInstance ( ): MyService
    {
        if ( ! this._instance )
        {
            this._instance = new MyService();
        }

        return this._instance;
    }

    constructor ( )
    {
        this._subjectLoggedin = new StateSubject<bool>(false);
    }

    public login ( ): void
    {
        // ...

        this._subjectLoggedin.next(true);
    }

    public logout ( ): void
    {
        // ...

        this._subjectLoggedin.next(false);
    }

    public isLoggedin ( ): StateSubject<bool>
    {
        return this._subjectLoggedin;
    }
}

interface MyComponentState
{
    loggedin: boolean;
}

class MyComponent extends React.Component<{}, MyComponentState>
{
    private readonly _myService: MyService;

    constructor ( props: any )
    {
        super(props);

        this.state = {
            loggedin: false
        };

        this._myService = MyService.getInstance();
    }

    public componentDidMount ( ): void
    {
        this._myService.isLoggedin().subscribe(this, ( loggedin ) =>
        {
            this.setState({
                loggedin
            });
        });

        const loggedin = this._myService.isLoggedin().get();
        this.setState({
            loggedin
        });
    }

    public componentWillUnmount ( ): void
    {
        this._myService.isLoggedin().unsubscribe(this);
    }

    public render ( )
    {
        return (
            <div>
                Loggedin: {this.state.loggedin}
                {/* ... */}
            </div>
        );
    }
}
```
