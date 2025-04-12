
SELECT * FROM Tasks;
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Tasks';


INSERT INTO Tasks (Title, Description, DueDate, Status, Priority, CreatedAt)
VALUES ('Test Task', 'This is a test task', GETDATE(), 0, 0, GETDATE());

SELECT 
    Id,
    Title,
    Description,
    FORMAT(DueDate, 'yyyy-MM-dd') as DueDate,
    CASE 
        WHEN Status = 0 THEN 'Not Started'
        WHEN Status = 1 THEN 'In Progress'
        WHEN Status = 2 THEN 'Completed'
    END as Status,
    CASE 
        WHEN Priority = 0 THEN 'Low'
        WHEN Priority = 1 THEN 'Medium'
        WHEN Priority = 2 THEN 'High'
    END as Priority,
    FORMAT(CreatedAt, 'yyyy-MM-dd HH:mm') as CreatedAt,
    FORMAT(CompletedAt, 'yyyy-MM-dd HH:mm') as CompletedAt
FROM Tasks
ORDER BY CreatedAt DESC; 