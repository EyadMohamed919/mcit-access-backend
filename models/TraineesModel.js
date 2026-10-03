const db = require("../config/db");

async function getAllTrainees(pr_ID) {
    try {
        const sql = `
            SELECT Trainees.* 
            FROM ((Trainees 
            INNER JOIN Training_Programs ON Trainees.prog_ID = Training_Programs.prog_ID)
            INNER JOIN Projects ON Training_Programs.pr_ID = Projects.pr_ID)
            WHERE Projects.pr_ID = ${Number(pr_ID)}
        `;
        
        const trainees = await db.query(sql);
        return trainees;
    } catch (error) {
        console.error("Error in getAllTrainees:", error.message);
        throw error;
    }
}

async function addNewTrainee(data) {
    try {
        const {
            prog_ID,
            ben_enrolled,
            ben_female,
            ben_male,
            ben_pwd,
            ben_completed,
            ben_retention,
            ben_trainer_id,
            gov_id,
            prog_date,
            out_id,
            tainee_type_id, 
            Age_Group_ID,
            training_center, 
            name_trainers,   
            type_of_disability 
        } = data;

        const escapeSql = (str) => (str && str.trim() !== '' ? `'${str.replace(/'/g, "''")}'` : 'NULL');
        
        const dateVal = prog_date && prog_date.trim() !== '' ? `'${prog_date}'` : 'NULL';

        const sql = `
            INSERT INTO Trainees (
                prog_ID, ben_enrolled, ben_female, ben_male, ben_pwd, 
                ben_completed, ben_retention, ben_trainer_id, gov_id, 
                prog_date, out_id, tainee_type_id, Age_Group_ID, 
                [Training Center], [name Trainer's], [Type of disability]
            ) VALUES (
                ${prog_ID ? Number(prog_ID) : 'NULL'}, 
                ${ben_enrolled ? Number(ben_enrolled) : 'NULL'}, 
                ${ben_female ? Number(ben_female) : 'NULL'}, 
                ${ben_male ? Number(ben_male) : 'NULL'}, 
                ${ben_pwd ? Number(ben_pwd) : 'NULL'}, 
                ${ben_completed ? Number(ben_completed) : 'NULL'}, 
                ${ben_retention ? Number(ben_retention) : 'NULL'}, 
                ${ben_trainer_id ? Number(ben_trainer_id) : 'NULL'}, 
                ${gov_id ? Number(gov_id) : 'NULL'}, 
                ${dateVal}, 
                ${out_id ? Number(out_id) : 'NULL'}, 
                ${tainee_type_id ? Number(tainee_type_id) : 'NULL'}, 
                ${Age_Group_ID ? Number(Age_Group_ID) : 'NULL'}, 
                ${escapeSql(training_center)}, 
                ${escapeSql(name_trainers)}, 
                ${escapeSql(type_of_disability)}
            )
        `;

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }

        return { success: true };
    } catch (error) {
        console.error("Error in addNewTrainee:", error.message);
        throw error;
    }
}

module.exports = { getAllTrainees, addNewTrainee };