const db = require("../config/db");

async function getAllOutputsByUserID(pr_id)
{
    try {
        const outputs = await db.query(`SELECT Outputs.* FROM Outputs
        WHERE Outputs.pr_ID = ${pr_id}`);
        return outputs;
    } catch (error) {
        console.log(error);
    }
    
}


async function addOutput(data) {
    try {
        const {
            out_title, out_title_en, pr_ID, protocol_id, 
            start_date, end_date, out_target, out_baseline, out_type_id
        } = data;

        const escapeSql = (str) => (str && str.trim() !== '' ? `'${str.replace(/'/g, "''")}'` : 'NULL');
        const startDateVal = start_date && start_date.trim() !== '' ? `'${start_date}'` : 'NULL';
        const endDateVal = end_date && end_date.trim() !== '' ? `'${end_date}'` : 'NULL';

        const sql = `
            INSERT INTO Outputs (
                out_title, out_title_en, pr_ID, protocol_id, 
                start_date, end_date, out_target, out_baseline, out_type_id
            ) VALUES (
                ${escapeSql(out_title)}, 
                ${escapeSql(out_title_en)}, 
                ${pr_ID ? Number(pr_ID) : 'NULL'}, 
                ${protocol_id ? Number(protocol_id) : 'NULL'}, 
                ${startDateVal}, 
                ${endDateVal}, 
                ${escapeSql(out_target)}, 
                ${out_baseline ? Number(out_baseline) : 'NULL'}, 
                ${out_type_id ? Number(out_type_id) : 'NULL'}
            )
        `;

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }
        return { success: true };
    } catch (error) {
        console.error("Error inserting Output:", error.message);
        throw error;
    }
}

async function deleteOutput(out_ID) {
    try {
        if (!out_ID) {
            console.error("deleteOutput error: out_ID is missing");
            return { success: false };
        }

        const sql = `DELETE FROM Outputs WHERE out_ID = ${Number(out_ID)}`;
        console.log("--> Executing Delete Query:", sql);

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }

        return { success: true };
    } catch (error) {
        console.error("Error in deleteOutput:", error.message);
        throw error;
    }
}


module.exports = {getAllOutputsByUserID, addOutput, deleteOutput};