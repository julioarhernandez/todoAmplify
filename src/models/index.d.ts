import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Items {
  readonly id: string;
  readonly name?: string;
  readonly status?: string;
  readonly status_date_changed?: string;
  readonly todoID: string;
  constructor(init: ModelInit<Items>);
  static copyOf(source: Items, mutator: (draft: MutableModel<Items>) => MutableModel<Items> | void): Items;
}

export declare class Todo {
  readonly id: string;
  readonly owner?: string;
  readonly date: string;
  readonly date_changed?: string;
  readonly date_freq?: number;
  readonly shared?: boolean;
  readonly status?: string;
  readonly Items_todo?: (Items | null)[];
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}