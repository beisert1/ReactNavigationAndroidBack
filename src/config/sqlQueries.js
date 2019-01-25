// !!!==== GET COMMANDS ====!!! //
/* eslint-disable */
export const getDeviceID = () => "SELECT DeviceID FROM MobileConfig"
// RegID, EventType, EventType, EventDate, EventDate, RegID, RegID, EventType, EventType, EventDate, EventDate, RegID, EventType, EventType, EventDate, EventDate 
export const getUserEventsAll = () => "SELECT DISTINCT eventid ,regid ,eventdate ,starttime ,endtime ,RTRIM(LTRIM([subject] )) as [subject]  ,RTRIM(LTRIM([description])) as  [description] ,'event' AS eventtype ,'true' AS allowadd ,'' AS exhname ,'' AS location ,eventdate AS eventdatesql ,'' AS boothdisplaylist FROM UserEvents WHERE ( RegID = ? OR RegID IS NULL ) AND 1 = CASE WHEN ? = '' OR ? = 'event' THEN 1 ELSE 0 END AND strftime('%Y-%m-%d 00:00:00', eventdate) = CASE WHEN ? = '' THEN strftime('%Y-%m-%d 00:00:00', eventdate) ELSE strftime('%Y-%m-%d 00:00:00', ?) END UNION SELECT DISTINCT s.scheduleid AS eventid ,? AS regid ,s.DATE, s.starttime ,endtime ,ss.title AS [subject] ,ss.description ,'session' AS eventtype ,s.allowadd ,'' AS exhname ,s.location ,s.DATE AS EventDateSQL ,'' AS boothdisplaylist FROM S_Schedule s INNER JOIN S_Sessions ss ON ss.sessionid = s.sessionid INNER JOIN S_MySessions sm ON sm.ScheduleID = s.ScheduleID WHERE sm.RegID = ? AND s.IsActive = 1 AND 1 = CASE WHEN ? = '' OR ? = 'session' THEN 1 ELSE 0 END AND strftime('%Y-%m-%d 00:00:00', S.Date) =  CASE WHEN ? = '' THEN strftime('%Y-%m-%d 00:00:00', S.Date) ELSE strftime('%Y-%m-%d 00:00:00', ?) END UNION SELECT DISTINCT em.MeetingID AS eventID ,ues.regid ,em.StartTime AS eventdate ,em.starttime AS starttime ,em.endtime ,e.exhname AS [subject] ,ues.notes AS [description] ,'schedule' AS eventtype ,'true' AS allowadd ,e.exhname ,'' AS location ,em.starttime AS EventDateSQL ,( SELECT group_concat(booth, ',') FROM booths WHERE exhid = e.exhid ) AS boothdisplay FROM ExhibitorMeetings em INNER JOIN Exhibitors e ON em.ExhID = e.exhid INNER JOIN Booths b ON e.exhid = b.exhid INNER JOIN UserExhibitorSchedules ues ON ues.meetingid = em.meetingid WHERE ues.RegID = ? AND e.isactive = 1 AND 1 = CASE WHEN ? = '' OR ? = 'schedule' THEN 1 ELSE 0 END AND strftime('%Y-%m-%d 00:00:00', em.StartTime) =  CASE WHEN ? = '' THEN strftime('%Y-%m-%d 00:00:00', em.StartTime) ELSE strftime('%Y-%m-%d 00:00:00', ?) END ORDER BY eventdate ,starttime ,endtime ,[subject]"
export const getRegisteredUser = () => "SELECT RegID FROM RegisteredUsers"
export const getLastAppSyncDate = () => "SELECT AppDataSyncDate FROM MobileConfig"
export const getRemotingQueue = () => "SELECT * FROM RemotingQueue ORDER BY DateInserted DESC"
export const getActivityLog = () => "SELECT * FROM ActivityLog"
export const getAllUserPhotosStatic = () => "SELECT DISTINCT ImageName, RegID, TimeCreated FROM UserImages WHERE RegID=@RegID ORDER BY TimeCreated DESC"
export const getLastSecondSplashTime = () => "SELECT LastSecondSplashTime FROM MobileConfig"
// MobilePageID
export const getDrillItems = () => "select DISTINCT Display,type,Content,BackgroundImage,Image, ImageSize, Content2, LinkCardID,LinkTargetID,LinkName,isSquare from MobileDrillItems WHERE MobilePageID = @MobilePageID ORDER BY DisplayOrder"
export const getDrillImages = () => "SELECT IconName,Display,type,Content,BackgroundImage,Image, ImageSize, Content2, LinkCardID,LinkTargetID,LinkName,isSquare, MobilePageID FROM MobileDrillItems WHERE Image IS NOT NULL AND Image != '' ORDER BY DisplayOrder ASC"
export const GetHalls = () => "SELECT h.hallid, h.display AS display, h.hallscale, h.iconscale, h.HallBackgroundDate FROM Halls h WHERE h.HasAttendeeView = 1 ORDER BY h.DisplayOrder  COLLATE NOCASE"
// Room/Location
export const GetPrivacyPolicy = () => "SELECT ShowName, PrivacyPolicy FROM MobileConfig"
export const GetTabLabel = () => "SELECT PageTitle AS Label FROM MobilePages WHERE MobilePageID = @PageID"
export const GetProductsPageTitle = () => "SELECT PageTitle FROM MobilePages WHERE MobilePageID = \"NewProductsLand\""

// !!!==== INSERT/UPDATE/DELETE COMMANDS ====!!! //
// CurrentTime
export const updateLastSyncDate = () => "UPDATE MobileConfig SET AppDataSyncDate = ?"
export const updateLastNavSyncDate = () => "UPDATE MobileConfig SET NavSyncDate = ?"
export const updateAttemptedNavSyncDate = () => "UPDATE MobileConfig SET AttemptedNavSyncDate = ?"
export const updateLastSecondSplashTime = () => "UPDATE MobileConfig SET LastSecondSplashTime = ?"
// CurrentTime, HallID
export const updateHallModDates = () => "UPDATE Halls SET HallBackgroundDate = ? WHERE HallID = ?"
// DeviceID
export const writeDeviceID = () => "UPDATE MobileConfig Set DeviceID = ?"
// FunctionCall, FunctionParameters
export const addToRemoteQueue = () => "INSERT INTO RemotingQueue (FunctionCall, FunctionParameters) VALUES (?, ?)"
// FunctionCall, FunctionParameters, DateInserted
export const deleteFromRemoteQueue = () => "DELETE FROM RemotingQueue WHERE FunctionCall = ? AND FunctionParameters = ? AND DateInserted = ?"
export const insertActivityLog = () => "INSERT INTO ActivityLog (ShowID, DeviceID, UserAction, UserAgent, ActionValue, AltValue, RegID, ActionDate) VALUES (@ShowID, @DeviceID, @UserAction, @UserAgent, @ActionValue,@AltValue,@RegID,@ActionDate)"
export const deleteActivityLog = () => "DELETE from ActivityLog"
export const updateLastActivityDate = () => "UPDATE MobileConfig SET LastUserActivityDate = ?"
export const getMobileTabs = () => "select DISTINCT MobilePageID,Label,Type,IconName,DisplayOrder,IsActive from mobiletabs where isactive = 1 ORDER BY DisplayOrder ASC"
