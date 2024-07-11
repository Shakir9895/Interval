import { FormProvider as Form } from 'react-hook-form';


export default function FormProvider({children,methods,onSubmit,onChange}) {
    console.log("methods>>>>",methods)
    return(
        <Form {...methods}>
            <form onSubmit={onSubmit} onChange={onChange}>{children}</form>
        </Form>
    )
}