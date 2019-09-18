/** 
 * @author: zhazhjie 
 * @email: zhazhjie@vip.qq.com
 * @date: 2019-02-19 14:05:04 
 * @version: 1.0 
 */

<template>
  <section class="material-library">
    <el-dialog
      title="素材库"
      :visible="visible"
      @update:visible="emitVisible"
      :close-on-click-modal="false"
      append-to-body
      width="800px">
    <el-tabs v-model="params.resType" @tab-click="handleTabClick">
      <el-tab-pane label="图片" name="image"></el-tab-pane>
      <el-tab-pane label="视频" name="video"></el-tab-pane>
      <el-tab-pane label="音频" name="audio"></el-tab-pane>
      <el-tab-pane label="文档" name="document"></el-tab-pane>
    </el-tabs>
    <div class="main">
      <div class="opt-area">
        <div class="upload-box">
          <div class="font16">{{type[params.resType]}}（共{{params.total}}{{unit}}）</div>
          <div>
            <span class="gray font12">大小不超过5M</span>
            <el-button type='primary' @click='emitSelectFile'>上传素材</el-button>
            <input type="file" ref='file' @change='selectFile' multiple style="display: none">
          </div>
        </div>
        <div class="pre-upload-box" v-if='imgUrlDataList.length'>
          <div class="pre-upload-item" v-for='(item,index) in imgUrlDataList'>
            <img class="file-img" :src="item.urlData">
            <span class="file-name">{{item.name}}</span>
            <i class="delete-btn" @click='handleDeletePreview(index)'>×</i>
          </div>
          <el-button type='danger' @click='handleUpload' :loading='uploadLoading'>提交</el-button>
        </div>
        <div class="group-box">
          <ul class="group-list">
            <li :class='curGroup.id===item.id?"select":""' v-for='(item,index) in groupList' @click='changeGroup(item,index)'>
              <span>{{item.groupName}}</span>
              <i v-if="item.id" class="btn" @click='handleDelete(item)'>×</i>
            </li>
          </ul>
          <div class="group-opt">
            <el-button type='danger' @click='handleUpdateGroup'>编辑分组</el-button>
            <el-button @click='handleAddGroup'>新建分组</el-button>
          </div>
        </div>
        <div class="selected-box">
          <div>
            <el-checkbox label='全选' :value='isSelectAll' @change='selectAll'/>
            <el-button type='primary' @click='submitSelect'>确认选择</el-button>
          </div>
          <div>
            <el-button type='danger' @click='handleDeleteMaterial'>删除</el-button>
            <el-button @click='handleMoveGroup'>移动到分组</el-button>
          </div>
        </div>
      </div> 
      <div class="search-box">
        <el-input placeholder="请输入素材名称" style='width:2rem' v-model='params.keywords'/>
        <el-button type='primary' plain @click='handleSearch'>搜索</el-button>
      </div> 
      <div class="content" v-loading='tableLoading'>
        <div class="material-item" :class='selectedMap[item.id]?"material-select":""' v-for='(item,index) in materialList'>
          <div class="material-img-box">
            <img class="material-img" v-src:pad.w_200.h_200="item.objUrl" @click='handleSelect(item)'>
            <el-checkbox class='select-btn' :value='!!selectedMap[item.id]' @change='handleSelect(item)'/>
            <el-dropdown class='more-opt'>
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native='handleRename(item)'>重命名</el-dropdown-item>
                <!-- <el-dropdown-item @click.native='handleMoveGroup(item)'>移动到分组</el-dropdown-item> -->
                <el-dropdown-item @click.native='handleDeleteItem(item)'>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="material-info">
            <span class="material-name" @click='handleRename(item)' v-if='item.id!=curMaterial.id'>{{item.aliasName}}</span>
            <div class="rename-box" v-else>
              <el-input v-model='curMaterial.aliasName' @blur='emitRename(item)' v-focus/>
            </div>
          </div>
          <div class="selected">
            <i></i>
          </div>
        </div>
        <div class="not-data gray" v-if='!materialList.length'>-暂无数据-</div>
      </div>
      <el-pagination style='margin-top: 20px' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="+params.current" :page-sizes="[12, 20, 40, 100]" :page-size="+params.size" layout="total, sizes, prev, pager, next, jumper" :total="+params.total">
    </el-pagination>
    </div>
  </el-dialog>
    <el-dialog
      :title="handleType?'编辑分组':'新建分组'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      append-to-body
      width="500px">
      <el-form :model='curGroup' label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label='分组名称' prop='groupName'>
          <el-input v-model="curGroup.groupName" placeholder="请输入分组名称"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleClose('')">取 消</el-button>
        <!--<el-button v-if='handleType' type="danger" @click="handleDelete()" :loading='handleLoading'>删除</el-button>-->
        <el-button type="primary" @click="handleSubmit()" :loading='handleLoading'>确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="移动到分组"
      :visible.sync="groupVisible"
      :close-on-click-modal="false"
      append-to-body
      width="500px">
      <ul class="group-list">
        <li :class='targetGroup==item.id?"select":""' v-for='(item,index) in groupList' @click='selectGroup(item,index)'>{{item.groupName}}</li>
      </ul>
      <span slot="footer">
        <el-button @click="setNegate('groupVisible')">取 消</el-button>
        <el-button type="primary" @click="moveGroup" :loading='groupLoading'>确认</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {compressImg} from '../js/util'
import {upload,listPage,updateById,deleteById,moveGroup} from '../api/res/resOss'
import {listGroup,saveGroup,updGroup,delGroup} from '../api/res/resGroup'
export default {
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    maxWidth:{
      type:Number,
      default: 750
    },
    maxHeight:{
      type:Number,
      default: 750
    }
  },
  data() {
    return {
      type:{
        "image":"图片",
        "video":"视频",
        "audio":"音频",
        "document":"文档"
      },
      handleLoading:false,
      tableLoading:false,
      uploadLoading:false,
    	dialogVisible:false,
      groupLoading:false,
      groupVisible:false,
      targetGroup:0,
      handleType:0,
      imgUrlDataList:[],
      materialList:[],
      selectedMap:{},
      selectedItem:[],
      curMaterial:{},
      groupList:[],
      curGroupIndex:null,
      rules: {
        groupName: [
          {required: true, message: '请输入分组名称', trigger: 'blur'},
        ],
      },
      curGroup:{
        id:0,
        groupName:'',
        resType:''
      },
      params:{
        keywords:"",
        resType:"image",
        groupId:0,
        current:1,
        size:12,
        total:12
      }
    }
  },
  components: {

  },
  methods: {
    emitVisible(){
      this.$emit("update:visible",false);
    },
    submitSelect(){
      let imgUrlList=[];
      for(let i in this.selectedMap){
        imgUrlList.push(this.selectedMap[i].objUrl);
      }
      if(!imgUrlList.length){
        return this.$message({
          type: 'warning',
          message: '请选择素材!'
        });
      }
      this.$emit('selectImg',imgUrlList);
      this.selectedMap={};
      this.emitVisible();
    },
    handleTabClick(tab,event){
      // console.log(tab,event)
      this.listGroup();
      this.listPage();
    },
    listGroup(){
      listGroup(this.params).then((res) => {
        this.groupList=res.data;
        this.groupList.unshift({id:0,groupName:"全部"});
      })
      .catch(err=>err)
    },
    changeGroup(item,index){
      this.curGroup={...item};
      this.curGroupIndex=index;
      this.params.groupId=item.id;
      this.listPage();
    },
    selectAll(){
      let keys=Object.keys(this.selectedMap);
      if(keys.length===this.materialList.length){
        this.selectedMap={};
      }else{
        let selectedMap={};
        this.materialList.forEach((el,i)=>{
          selectedMap[el.id]=el;
        });
        this.selectedMap=selectedMap;
      }
    },
    emitSelectFile(){
      this.$refs.file.click();
    },
    selectFile(e){
      let files=e.target.files;
      let len=files.length;
      for(let i=0;i<len;i++){
        let file=files[i];
        switch (true) {
          case file.size>5*1000*1000:
            return this.$message({
              type: 'warning',
              message: '文件大小不超过5M!'
            });
          case !/image\/(jpg|png|jpeg)/ig.test(file.type):
            return this.$message({
              type: 'warning',
              message: '请选择jpg或png格式!'
            });
          default:
            let data={
              file,
              maxWidth: this.maxWidth,
              maxHeight: this.maxHeight
            };
            compressImg(data).then((data,name)=>{
              this.imgUrlDataList.push({
                urlData:data,
                name:file.name,
                groupId:this.curGroup.id
              })
            });
            break;
        }
      }
    },
    handleDeletePreview(index){
      this.imgUrlDataList.splice(index,1);
    },
    handleUpload(){
      if(this.imgUrlDataList>10){
        return this.$message({
          type: 'warning',
          message: '最多同时上传10个文件!'
        });
      }
      this.uploadLoading=true;
      upload(this.imgUrlDataList).then((res) => {
        this.uploadLoading=false;
        this.imgUrlDataList=[];
        this.$message({
          type: 'success',
          message: '上传成功!'
        });
        this.listPage(res.data);
      })
      .catch(err=>this.uploadLoading=false)
    },
    handleRename(item){
      this.curMaterial={...item};
    },
    emitRename(item){
      let curMaterial={...this.curMaterial};
      this.curMaterial={};
      if(curMaterial.aliasName===item.aliasName||!curMaterial.aliasName) return;
      updateById(curMaterial).then((res) => {
        item.aliasName=curMaterial.aliasName;
        this.$message({
          type: 'success',
          message: '重命名成功!'
        });
      })
      .catch(err=>err)
    },
    handleSizeChange(size) {
      this.params.size = size;
      this.listPage();
    },
    handleCurrentChange(current) {
      this.params.current = current;
      this.listPage();
    },
    handleSelect(item){
      if(this.selectedMap[item.id]){
        delete this.selectedMap[item.id];
      }else{
        this.selectedMap[item.id]=item;
      }
      this.selectedMap={...this.selectedMap};
    },
    listPage(uploadFiles){
      this.selectedMap={};
      this.tableLoading=true;
      listPage(this.params).then((res) => {
        this.tableLoading=false;
        this.materialList=res.data.records;
        this.params.total=res.data.total;
        if(uploadFiles){
          let selectedMap={};
          this.materialList.forEach(el=>{
            if(uploadFiles.indexOf(el.objUrl)>-1){
              selectedMap[el.id]=el;
            }
          });
          this.selectedMap=selectedMap;
        }
      })
      .catch(err=>this.tableLoading=false)
    },
    handleDeleteMaterial(){
      let keys=Object.keys(this.selectedMap);
      if(!keys.length){
        return this.$message({
          type: 'warning',
          message: '请选择需要删除的素材!'
        });
      }
      this.submitDeleteMaterial(keys);
    },
    handleDeleteItem(item){
      this.submitDeleteMaterial([item.id]);
    },
    submitDeleteMaterial(ids){
      this.confirm('确认删除选中素材吗？').then(res=>{
        deleteById(ids).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.selectedMap={};
          this.listPage();
        })
        .catch(err=>err)
      })
    },
    handleAddGroup(){
      this.curGroup.groupName = '';
      this.handleType=0;
      this.dialogVisible=true;
    },
    handleUpdateGroup() {
      if(!this.curGroup.id){
        return this.$message({
          type: 'warning',
          message: '请选择需要编辑的分组!'
        });
      }
      this.handleType = 1;
      this.dialogVisible = true;
      this.curGroup={...this.groupList[this.curGroupIndex]};
    },
    handleDelete(item) {
      this.handleLoading = true;
      this.confirm('确定要删除分组[' + item.groupName + ']吗?')
      .then(() => {
        delGroup(item.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.dialogVisible = false;
          this.handleLoading = false;
          this.curGroup.id=0;
          this.params.groupId=0;
          this.curGroupIndex=0;
          this.listGroup();
          this.listPage();
        });
      });
    },
    handleSearch() {
      this.params.current = 1;
      this.listPage();
    },
    handleSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.handleLoading = true;
          if (this.handleType) {
            this.submitUpdate();
          } else {
            this.submitAdd();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitAdd() {
      saveGroup({
        resType:this.params.resType,
        groupName:this.curGroup.groupName
      }).then(() => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        });
        this.listGroup();
        this.dialogVisible = false;
        this.handleLoading = false;
        this.handleClose();
      }).catch(() => {
        this.handleLoading = false;
      });
    },
    submitUpdate() {
      updGroup(this.curGroup).then(() => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        this.listGroup();
        this.dialogVisible = false;
        this.handleLoading = false;
        this.handleClose();
      }).catch(() => {
        this.handleLoading = false;
      });
    },
    handleMoveGroup(){
      let ids=Object.keys(this.selectedMap);
      if(!ids.length){
        return this.$message({
          type: 'warning',
          message: '请选择需要移动分组的素材!'
        });
      }
      this.groupVisible=true;
    },
    moveGroup(){
      this.groupLoading=true;
      let ids=Object.keys(this.selectedMap);
      moveGroup({
        targetGroup:this.targetGroup,
        ids:ids
      }).then(() => {
        this.$message({
          type: 'success',
          message: '移动分组成功!'
        });
        this.listPage();
        this.groupVisible = false;
        this.groupLoading = false;
        this.handleClose();
      }).catch(() => {
        this.groupLoading = false;
      });
    },
    selectGroup(item){
      this.targetGroup=item.id;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.resetForm('ruleForm');
      if (done) {
        done();
      }
    }
  },
  directives: {
    focus: {
      inserted(el){
        el.querySelector('.el-input__inner').focus();
      }
    }
  },
  computed: {
    unit(){
      let resType=this.params.resType;
      switch (resType) {
        case "image":
          return "张";
        case "video":
        case "audio":
          return "个";
        case "document":
          return "份";
        default:
          // statements_def
          break;
      }
    },
    isSelectAll(){
      let len=Object.keys(this.selectedMap).length;
      return len&&len===this.materialList.length;
    }
  },
  mounted(){
    this.listGroup();
    this.listPage();
  }
}
</script>

<style scoped>
@import url('../css/var.css');
.material-library{
  
}
.opt-area{
  
}
.pre-upload-box{
  border: 1px dashed var(--border);
  margin: 0.1rem 0;
  padding: 0.15rem;
  border-radius: 0.1rem;
}
.pre-upload-item{
  width: 3rem;
  border: 1px solid var(--border);
  border-radius: 0.05rem;
  padding: 0.1rem;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.15rem;
}
.file-img{
  width: 0.7rem;
  height: 0.7rem;
  margin-right: 0.1rem;
  flex-shrink: 0;
}
.file-name{
  word-break: break-all;
}
.delete-btn{
  position: absolute;
  top: 0;
  right: 0;
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  text-align: center;
  cursor: pointer;
  font-size: 0.18rem;
  color: var(--gray);
}
.delete-btn:hover{
  color: #666;
}
.upload-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.15rem;
}
.group-box{
  display: flex;
  padding: 0.1rem 0;
}
.group-opt{
  flex-shrink: 0;
  padding: 0.05rem 0;
}
.group-list{
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.group-list li{
  height: 0.3rem;
  line-height: 0.3rem;
  padding: 0 0.15rem;
  cursor: pointer;
  margin: 0.05rem 0;
  color: var(--gray);
}
.group-list li:hover{
  color: var(--blue);
}
.group-list li.select{
  border: 1px solid var(--blue);
  border-radius: 0.3rem;
  color: var(--blue);
}
.selected-box{
  display: flex;
  justify-content: space-between;
  padding: 0.15rem;
  background: #f5f5f5;
  margin-bottom: 0.15rem;
}
.content{
  display: flex;
  flex-wrap: wrap;
}
.material-item{
  width: 1.8rem;
  padding: 0.15rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}
.material-item:hover{
  box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.3);
}
.material-img-box{
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.1rem;
}
.material-img{
  max-width: 100%;
  max-height: 100%;
}
.select-btn{
  display: none;
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
}
.more-opt{
  display: none;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.material-name{
  word-break: break-all;
  cursor: pointer;
}
.material-item:hover .more-opt,
.material-item:hover .select-btn{
  display: block;
}
.material-select{
  box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.3);
}
.material-select .more-opt,
.material-select .select-btn{
  display: block;
}
.rename-box{
  display: flex;
}
.not-data{
  width: 100%;
  text-align: center;
  margin: 0.2rem;
}
.search-box{
  text-align: center;
  margin-bottom: 0.15rem;
}
.group-list li .btn{
  display: none;
  transition: all 0.1s;
}
.group-list li .btn:hover{
  transform: scale(1.2);
}
  .group-list li:hover .btn{
    display: inline-block;
  }
</style>
<style>
.material-item .el-checkbox__inner{
  height: 18px;
  width: 18px;
}
.material-item .el-checkbox__inner::after{
  height: 10px;
  left: 5px;
  top: 1px;
  width: 5px;
}
</style>
