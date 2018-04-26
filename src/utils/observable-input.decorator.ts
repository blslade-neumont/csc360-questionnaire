import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { distinctUntilChanged as rxDistinctUntilChanged } from 'rxjs/operators';

const DEBUG_BINDING = false;

export function ObservableInput(bindingPropertyName?: string, skipNullAndUndefined: boolean = false, distinctUntilChanged = false) {
    return function(target: any, propertyKey: string | symbol) {
        let pk: string;
        if (typeof propertyKey === 'symbol') {
            pk = propertyKey.toString().substr(7);
            pk = pk.substr(0, pk.length - 1);
        }
        else pk = propertyKey;
        
        let targetName = target && target.constructor && target.constructor.name;
        
        let bpn = bindingPropertyName || pk;
        if (!bpn) throw new Error(`No binding property name! Target: ${targetName}`);
        
        if (DEBUG_BINDING) console.log(`Binding ${bpn} to ${pk}`);
        // Input(bpn)(target, pk);
        
        let obpn = bpn + '-o';
        let bpnObservable = pk + 'Observable';
        if (DEBUG_BINDING) console.log(`Binding ${obpn} to ${bpnObservable}`);
        // Input(obpn)(target, bpnObservable);
        
        let propInternalsSym = Symbol();
        type PropIntT = {
            currentObservable: Observable<any> | null,
            currentSubscription: Subscription | null,
            subject: ReplaySubject<any>,
            subjectObservable: Observable<any>,
            currentValue: any,
            subscriptionCount: number
        };
        function getPropInternals(self: any): PropIntT {
            if (!self[propInternalsSym]) {
                let subject = new ReplaySubject<any>(1);
                let baseObserve = subject.asObservable();
                if (distinctUntilChanged) baseObserve = baseObserve.pipe(rxDistinctUntilChanged());
                let observe = Observable.create((subscriber: Subscriber<any>) => {
                    return handleSubscription(self, baseObserve, subscriber);
                });
                let i = self[propInternalsSym] = {
                    currentObservable: null,
                    currentSubscription: null,
                    subject: subject,
                    subjectObservable: observe,
                    currentValue: undefined,
                    subscriptionCount: 0
                };
            }
            return self[propInternalsSym];
        }
        function handleSubscription(self: any, baseObserve: Observable<any>, subscriber: Subscriber<any>): () => void {
            let i = getPropInternals(self);
            if (!i.subscriptionCount++ && i.currentObservable) {
                i.currentSubscription = i.currentObservable.subscribe(val => self[pk!] = val);
            }
            let mySubscription: Subscription | null = baseObserve.subscribe(val => subscriber.next(val), err => subscriber.next(err));
            return () => {
                if (!mySubscription) return;
                mySubscription.unsubscribe();
                mySubscription = null;
                if (!--i.subscriptionCount && i.currentSubscription) {
                    i.currentSubscription.unsubscribe();
                    i.currentSubscription = null;
                }
            }
        }
        
        Object.defineProperties(target, {
            [pk]: {
                get: function(this: any) {
                    let { currentValue } = getPropInternals(this);
                    return currentValue;
                },
                set: function(this: any, val: any) {
                    if (skipNullAndUndefined && (val === null || typeof val === 'undefined')) return;
                    if (val instanceof Observable) {
                        throw new Error(`Illegal binding to Observable. Property: ${targetName}.${pk}. Should use ${targetName}.${obpn}`);
                    }
                    let i = getPropInternals(this);
                    i.currentValue = val;
                    i.subject.next(i.currentValue);
                }
            },
            [bpnObservable]: {
                get: function(this: any) {
                    let { subjectObservable } = getPropInternals(this);
                    return subjectObservable;
                },
                set: function(this: any, val: Observable<any> | null) {
                    if (val && !(val instanceof Observable)) {
                        throw new Error(`Illegal binding to non-Observable. Property: ${targetName}.${obpn}. Should use ${targetName}.${pk}.`);
                    }
                    if (skipNullAndUndefined && !val) return;
                    let i = getPropInternals(this);
                    if (val == i.currentObservable) return;
                    i.currentObservable = val;
                    if (i.currentSubscription) {
                        i.currentSubscription.unsubscribe();
                        i.currentSubscription = null;
                    }
                    if (i.currentObservable && i.subscriptionCount > 0) {
                        i.currentSubscription = i.currentObservable.subscribe(val => this[pk!] = val);
                    }
                }
            }
        });
    }
}
