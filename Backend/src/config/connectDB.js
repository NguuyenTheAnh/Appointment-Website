import { Sequelize } from 'sequelize';
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db-project-1', 'Anh', '100804', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
});

const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connectionDB;