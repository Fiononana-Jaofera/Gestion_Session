import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqual(main: string, confirm: string): ValidatorFn | null{
    return (ctr: AbstractControl): ValidationErrors | null => {
        if(!ctr.get(main)||!ctr.get(confirm)){
            return {
                equals: 'nom de champ invalid'
            }
        }
        const mdp = ctr.get(main)!.value
        const confirmMdp = ctr.get(confirm)!.value

        return mdp===confirmMdp?null:{equals: true}
    }
}