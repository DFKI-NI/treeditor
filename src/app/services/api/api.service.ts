import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  TreeShort,
  TreeDisplay,
  TreeOut,
  Color,
  TreeKind,
} from '../../models/tree.models';
import { DataType, WorkingDataType } from '../../models/core.models';
import { ApiServiceInterface } from './api.service.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements ApiServiceInterface {
  baseUrl = 'http://127.0.0.1:8000/api';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAllTreeKinds(): Observable<TreeKind[]> {
    return this.http.get<TreeKind[]>(this.baseUrl + '/tree/kind/all', );
  }
  getAllTrees(): Observable<TreeShort[]> {
    return this.http.get<TreeShort[]>(this.baseUrl + '/tree/all', );
  }
  getTree(): Observable<TreeDisplay> {
    return this.http.get<TreeDisplay>(this.baseUrl + '/tree/latest', );
  }
  getTreeById(id: number): Observable<TreeDisplay> {
    return this.http.get<TreeDisplay>(this.baseUrl + '/tree/id/' + id, );
  }

  postTree(tree: TreeOut, isMajor: boolean): Observable<TreeShort> {
    const body = JSON.stringify({
      created_by: tree.created_by,
      new_major_version: isMajor,
      root: tree.root,
      nodes: tree.nodes,
      leafs: tree.leafs,
    });
    console.log('we want to post something here');
    console.log(tree);
    return this.http.post<TreeShort>(
      this.baseUrl + '/tree/new/' + tree.kind_of_tree,
      body,
      {
        headers: this.httpHeaders,
      }
    );
  }

  createNewTreeKind(name: string, description: string): Observable<TreeKind> {
    const body = JSON.stringify({
      name: name,
      description: description,
    });
    console.log(body);
    return this.http.post<TreeKind>(this.baseUrl + '/tree/kind/new', body,{
      headers: this.httpHeaders,
    });
  }

  createNewDataTyp(dataType: WorkingDataType): Observable<DataType> {
    const body = JSON.stringify(dataType);
    console.log(body);
    return this.http.post<DataType>(this.baseUrl + '/core/datatype/new', body,{
      headers: this.httpHeaders,
    });
  }

  getDataTypes(): Observable<DataType[]> {
    return this.http.get<DataType[]>(this.baseUrl + '/core/datatype/all', );
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.baseUrl + '/tree/colors', );
  }
}
