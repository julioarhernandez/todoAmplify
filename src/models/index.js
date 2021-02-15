// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Items, Todo } = initSchema(schema);

export {
  Items,
  Todo
};