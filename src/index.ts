import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import { Employee } from "./entity/Employee";
import { Task } from "./entity/Task";

createConnection().then(async connection => {
  // await create(connection);
  // await assign(connection);
  await unassign(connection);
}).catch(error => console.log(error));

const create = async (connection: Connection) => {
  const employeeRepository = connection.getRepository(Employee);
  const taskRepository = connection.getRepository(Task);
  await employeeRepository.save([
    new Employee({ id: 1 }),
    new Employee({ id: 2 }),
    new Employee({ id: 3 })
  ]);
  await taskRepository.save(
    new Task({ id: 1 })
  );
}

const assign = async (connection: Connection) => {
  const employeeRepository = connection.getRepository(Employee);
  const taskRepository = connection.getRepository(Task);
  const employees = await employeeRepository.find();
  await taskRepository.save(new Task({
    id: 1,
    assignees: employees,
  }));
}

const unassign = (connection: Connection) => {
  const taskRepository = connection.getRepository(Task);
  taskRepository
    .findOne(1, { relations: ['assignees'] })
    .then(async (result) => {
      result.assignees = result.assignees.filter(employee => employee.id !== 3);
      await result.save();
    });
}
