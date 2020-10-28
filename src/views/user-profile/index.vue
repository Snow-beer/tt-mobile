<template>
  <div>
    <van-nav-bar
      title="个人资料"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" size="large" center>
      <van-image
        width="30"
        height="30"
        fit="cover"
        round
        :src="userProfiel.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="userProfiel.name" 
    @click="isNameShow = true"
    size="large" is-link />
    <van-cell title="性别"
    @click="isGendershow=true" 
    :value="userProfiel.gender === 0 ?'男':'女' " size="large" is-link />
    <van-cell title="生日" :value="userProfiel.birthday" size="large" is-link />
    <van-popup v-model="isNameShow" position="top" :style="{ height: '100%' }" >
        <!--  -->
        <!-- @updateNameOver='userProfiel.name = $event'  -->
        <!-- :userName='userProfiel.name' -->
        <UpdateName 
        v-if="isNameShow"
        @close='isNameShow=false'
        v-model="userProfiel.name"
        ></UpdateName>
    </van-popup>
    <van-popup v-model="isGendershow" position="bottom" :style="{ height: '40%' }" >
      <UpdateGender 
      v-model="userProfiel.gender"
      @closegender='isGendershow=false'></UpdateGender>
    </van-popup>
  </div>
  
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
export default {
    name: 'UserProfielIndex',
    data(){
        return{
            userProfiel: {},
            isNameShow:false,
            isGendershow:false

        }
    },
    components:{UpdateName, UpdateGender},
    created(){
        this.loadUserProfile()
    },
    methods: {
        async loadUserProfile(){
          const {data} = await  getUserProfile()
          console.log(data)
          this.userProfiel = data.data
        },
        
    }
};
</script>

<style>
</style>