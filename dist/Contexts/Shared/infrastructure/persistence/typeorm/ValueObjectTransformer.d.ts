import { NewableClass } from '../../../domain/NewableClass';
import { ValueObject } from '../../../domain/value-object/ValueObject';
export declare const ValueObjectTransformer: (ValueObject: NewableClass<ValueObject<any>>) => {
    to: (value: ValueObject<any>) => any;
    from: (value: any) => ValueObject<any>;
};
