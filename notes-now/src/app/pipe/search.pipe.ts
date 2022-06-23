import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
    // const resultNote = [];
    // for (const note of value) { //value tiene todas las notas 
    //   if (note.title.toLoweCase().indexOf(arg.toLoweCase()) > -1) { //comprobar si el titulo del post corresponde con el argumento que pasa el usuario en el buscador
    //     console.log('si esta bien')
    //     resultNote.push(note); //inserto en el array el resultado de la busqueda 
    //   }
    // }
    // return resultNote;
  }

}
