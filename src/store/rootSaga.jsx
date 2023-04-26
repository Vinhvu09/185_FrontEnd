
import { call, put, takeLatest } from 'redux-saga/effects'
import departmentsService from '../service/departmentsService'
import meetingsService from '../service/meetingsService'
import missionService from '../service/missionService'
import relicsService from '../service/relicsService'
import usersService from '../service/usersService'
import { getDepartmentUser, getDepartmentUserStart } from './Reducer/departmentReducer'
import { hideLoading } from './Reducer/loadingReducer'
import { getAuthStart, setAuth, setLoginError } from './Reducer/usersReducer'
import { addScheduleStart, addScheduleSuccess, getDataSchedules, getDataSchedulesStart, meetingReducer, setErrorAddSchedule } from './Reducer/meetingReducer'
import { fetchMissionList, getMissionList } from './Reducer/missionReducer'
import relicsReducer, { deleteRelicsItemReducer, editRelicsItemReducer, fetchRelicsDetail, fetchRelicsList, fetchRelicsRelative, getRelicsDetail, getRelicsList, getRelicsRelative, postRelics } from './Reducer/relicsReducer'





function* handleGetAuth({ payload }) {
  try {

    const authUser = yield call(usersService.checkUserLogin, payload)
    yield put(setAuth(authUser))
  } catch (error) {
    yield put(setLoginError(error))
  }

}

function* handleGetDepartmentUser() {
  try {
    const dataDepartmentUser = yield call(departmentsService.getDepartmentsUser)
    yield put(getDepartmentUser(dataDepartmentUser))
  } catch (error) {
    console.log(error)
  }
}


function* handleAddSchedule({ payload }) {
  try {
    const response = yield call(meetingsService.addSchedule, payload)
    if (response.status === 201) {
      yield put(addScheduleSuccess())
    }

  } catch (error) {
    console.log(error)
    if (error?.response?.data?.message === "Schedule with same date and start time already exists") {
      yield put(setErrorAddSchedule("* Thời gian cuộc họp trùng với cuộc họp khác"))
    }
    else {
      if (error?.response?.status) {
        yield put(setErrorAddSchedule("* Tên cuộc họp đã bị trùng"))
      }
    }
  }
}

function* handleGetDataSchedules({ payload }) {
  try {
    const response = yield call(meetingsService.getSchedules, payload)
    yield put(getDataSchedules(response))

  }
  catch (e) {
    console.log(e)
  }
}

function* handleFetchRelicsList(action) {
  try {
    const { count, results } = yield call(relicsService.getRelicsList, action.payload)
    yield put(getRelicsList({ count, results }))
  } catch (e) {
    console.log(e)
  }
}
function* handleFetchRelicsDetail(action) {
  try {
    const data = yield call(relicsService.getRelicsDetail, action.payload)
    yield put(getRelicsDetail(data))
  } catch (e) {
    console.log(e)
  }
}
function* handlePostRelics(action) {
  try {
    const result = yield call(relicsService.postRelics, action.payload)
    if (result.success) {
      yield put(hideLoading())
    }
  } catch (e) {
    console.log(e)
  }
}
function* handleDeleteRelicsItem(action) {
  try {
    yield call(relicsService.deleteRelicsItem, action.payload.id)
    const results = yield call(relicsService.getRelicsList, action.payload.qs)
    yield put(getRelicsList(results))
  } catch (e) {
    console.log(e)
  }
}
function* handleEditRelicsItem(action) {
  try {
    let result = yield call(relicsService.updateRelicsItem, action.payload.id, action.payload.data)
    if (result.success) {
      yield put(hideLoading())
    }
  } catch (error) {
    console.log(error)
  }
}
function* handleFetchRelicsRelative(action) {
  try {
    let { results } = yield call(relicsService.getRelicsRelative, action.payload)
    yield put(getRelicsRelative(results))
  } catch (error) {
    console.log(error)
  }
}

function* handleFetchMissionList() {
  try {
    let result = yield call(missionService.getList)
    yield put(getMissionList(result))
  } catch (error) {
    console.log(error)
  }
}

function* rootSaga() {
  yield takeLatest(getAuthStart.type, handleGetAuth)
  yield takeLatest(getDepartmentUserStart.type, handleGetDepartmentUser)
  yield takeLatest(addScheduleStart.type, handleAddSchedule)
  yield takeLatest(getDataSchedulesStart.type, handleGetDataSchedules)
  yield takeLatest(fetchRelicsList.type, handleFetchRelicsList)
  yield takeLatest(fetchRelicsDetail.type, handleFetchRelicsDetail)
  yield takeLatest(postRelics.type, handlePostRelics)
  yield takeLatest(deleteRelicsItemReducer.type, handleDeleteRelicsItem)
  yield takeLatest(editRelicsItemReducer.type, handleEditRelicsItem)
  yield takeLatest(fetchRelicsRelative.type, handleFetchRelicsRelative)
  yield takeLatest(fetchMissionList.type, handleFetchMissionList)
}


export default rootSaga