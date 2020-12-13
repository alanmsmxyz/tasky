let db

const init = () => {
    return new Promise( ( resolve, reject ) => {
        // Let us open our database
        const DBOpenRequest = indexedDB.open( "tasky", 4 )

        // these two event handlers act on the database being opened successfully, or not
        DBOpenRequest.onerror = () => reject( 'Error loading database' )

        DBOpenRequest.onsuccess = () => {
            resolve( 'Database initialised' )

            // store the result of opening the database in the db variable. This is used a lot below
            db = DBOpenRequest.result
        }

        DBOpenRequest.onupgradeneeded = ( e ) => {
            let db = e.target.result

            db.onerror = () => reject( 'Error upgrading database' )

            let taskList = db.createObjectStore( "taskList", { keyPath: "id", autoIncrement: true } )

            taskList.createIndex( "id", "id", { unique: true } )
            taskList.createIndex( "name", "name", { unique: false } )
            taskList.createIndex( "description", "description", { unique: false } )
            taskList.createIndex( "date", "date", { unique: false } )
            taskList.createIndex( "time", "time", { unique: false } )
            taskList.createIndex( "category", "category", { unique: false } )
            taskList.createIndex( "notified", "notified", { unique: false } )


            let categoryList = db.createObjectStore( "categoryList", { keyPath: "id", autoIncrement: true } )

            categoryList.createIndex( "id", "id", { unique: true } )
            categoryList.createIndex( "name", "name", { unique: false } )
            categoryList.createIndex( "color", "color", { unique: false } )

            db.onsuccess = () => resolve( 'Database upgraded' )
        }
    } )
}

const checkConnection = () => {
    return db ? true : false
}

const loadAllTask = () => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'taskList' ).objectStore( 'taskList' ).getAll()

        request.onerror = ( e ) => reject( 'Transaction error: ' + e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const loadTask = ( id ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'taskList' ).objectStore( 'taskList' ).get( id )

        request.onerror = ( e ) => reject( 'Transaction error: ', e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const addTask = ( task ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'taskList', 'readwrite' ).objectStore( 'taskList' ).add( task )

        request.onerror = ( e ) => reject( 'Transaction error: ', e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const updateTask = ( task ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'taskList', 'readwrite' ).objectStore( 'taskList' ).put( task )

        request.onerror = ( e ) => reject( 'Transaction error: ', e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const removeTask = ( id ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'taskList', 'readwrite' ).objectStore( 'taskList' ).delete( id )

        request.onerror = ( e ) => reject( 'Transaction error: ', e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const loadAllCategory = () => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'categoryList' ).objectStore( 'categoryList' ).getAll()

        request.onerror = ( e ) => reject( 'Transaction error: ' + e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const loadCategory = ( id ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'categoryList' ).objectStore( 'categoryList' ).get( id )

        request.onerror = ( e ) => reject( 'Transaction error: ' + e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const addCategory = ( task ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'categoryList', 'readwrite' ).objectStore( 'categoryList' ).add( task )

        request.onerror = ( e ) => reject( 'Transaction error: ' + e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const updateCategory = ( task ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'categoryList', 'readwrite' ).objectStore( 'categoryList' ).put( task )

        request.onerror = ( e ) => reject( 'Transaction error: ' + e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

const removeCategory = ( id ) => {
    return new Promise( ( resolve, reject ) => {
        let request = db.transaction( 'categoryList', 'readwrite' ).objectStore( 'categoryList' ).delete( id )

        request.onerror = ( e ) => reject( 'Transaction error: ' + e.target.error )
        request.onsuccess = ( e ) => resolve( e.target.result )
    } )
}

export { init, checkConnection, loadAllTask, loadTask, addTask, updateTask, removeTask, loadAllCategory, loadCategory, addCategory, updateCategory, removeCategory }