import React, { FunctionComponent, useEffect, useState } from 'react'
import { Text , TouchableOpacity, View, StyleSheet, Image, Pressable, Modal, Alert, ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../Redux/userListSlice'
import { RootState } from '../Redux/store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const UserList: FunctionComponent = () => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const screenState = useSelector((state: RootState)=> state.userList)
    const [allUSers, setAllUsers] = useState(screenState.users);

    useEffect(()=>{
dispatch(fetchUsers())
setAllUsers(screenState.users)
    }, [])
    useEffect(()=>{
    }, [allUSers])
    console.log(screenState)
    const removeUser = (id: any) => {
        console.log('id',id)
        setAllUsers(allUSers.filter(user => user.id !== id))
        console.log('filter',allUSers)
    }

    const RenderUser = ({ user }: any ) => {
        return (
            <View style={{marginTop:10, marginBottom:20}}> 
            <View style={{marginBottom:0, alignSelf:'flex-end', width:20, height:20}}> 
                <Text onPress={() => removeUser(user.id)} style={{color:'red'}} >X</Text>
            </View> 
          <TouchableOpacity
            style={{width:110, height:100, margin:20}}
            onPress={() => {setModalVisible(true); setCurrentUser(user)}}
          >
             {/* <Text
              style={[styles.button, styles.buttonClose]}
              
            > */}
            {/* </Pressable> */}
             <Image style={{ width: 90, height: 100 }} source={{ uri: user?.image }} />
             <View style={{flexDirection:'row', justifyContent:'center'}}>
           <Text style={{marginRight:10}}>{user.firstName}</Text>
           <Text>{user.age}</Text>
           </View>
   
           
            
          
          </TouchableOpacity>
          </View> 
        )
      }
      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        image: {
          flex: 1,
          justifyContent: "center"
        },
        text: {
          color: "white",
          fontSize: 42,
          lineHeight: 84,
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#000000c0"
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "flex-start",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
          },
          buttonOpen: {
            backgroundColor: "#F194FF",
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          }
      });
  return (
    <>
    <ScrollView>
    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
    {allUSers && allUSers.map((user, i) => (
        <RenderUser
        key={i}
        user={user}
      />
    ))}
    </View>
    </ScrollView>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> First Name : {currentUser?.firstName}</Text>
            <Text style={styles.modalText}> Last Name : {currentUser?.LastName}</Text>
            <Text style={styles.modalText}> Age : {currentUser?.age}</Text>
            <Text style={styles.modalText}>Company details</Text>
            <Text style={styles.modalText}> Address : {currentUser?.address?.address}</Text>
            <Text style={styles.modalText}> Postal Code : {currentUser?.address?.postalCode}</Text>
            <Text style={styles.modalText}> State : {currentUser?.address?.state}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default UserList