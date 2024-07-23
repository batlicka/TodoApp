import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'isEditModeActivePipe'
})

export class IsEditModeActivePipe implements PipeTransform{
    transform(id: string, arr: string []) {
        id = id.toString() 
        if(arr.includes(id)){
            console.log("IsEditModeActivePipe returned for input id: "+ id + "value: true")
            return true;
          }
          else 
            console.log("IsEditModeActivePipe returned for input id: "+ id + "value: false")
            return false;
    }
}