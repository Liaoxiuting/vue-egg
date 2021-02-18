<template>
  <div class="file-list">
    <div
      v-if="showBreadCrumb"
      class="breadcrumb"
    >
      <div
        v-for="(item, index) in navNameList"
        :key="index"
        @click="clickNav(item, index)"
      >
        <span style="margin: 0 5px">{{ index > 0 ? '/' : '' }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="app-container">
      <div class="file-search">
        <search
          ref="search"
          @onQuery="onQuery"
          @onReset="onReset"
        />
      </div>
      <div class="file-section">
        <div class="file-header">
          <el-button v-if="permission.includes('file-add-page')" type="success" icon="el-icon-plus" @click="onAddFile">创建文件夹</el-button>
          <el-button v-if="permission.includes('file-upload')" type="primary" @click="uploadFile">上传</el-button>
          <el-button v-if="permission.includes('file-del')" type="danger" plain @click="deleteFile">删除</el-button>
        </div>
        <el-table
          ref="fileList"
          v-loading="fileInfo.loading"
          :data="fileInfo.list"
          style="width: 100%"
          :header-cell-style="{ background:'#F0F2F5', color:'#91939A' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="名称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.isDirectory && !scope.row.isZipDirectory" class="file-name" style="cursor: pointer;" @click="goToSubFile(scope.row)">
                <img v-if="!scope.row.isEmpty" class="icon" src="./image/文件夹.png" alt="">
                <img v-else class="icon" src="./image/wenjianjia.png" alt="">
                <div>{{ scope.row.name }}</div>
              </div>
              <div v-if="scope.row.isDirectory && scope.row.isZipDirectory" class="file-name">
                <img v-if="!scope.row.isEmpty" class="icon" src="./image/文件夹.png" alt="">
                <img v-else class="icon" src="./image/wenjianjia.png" alt="">
                <div>{{ scope.row.name }}</div>
              </div>
              <div v-else-if="!scope.row.isDirectory" class="file-name">
                <img class="icon" :src="require('./image/' + getFileType(scope.row.name) + '.png')" alt="">
                <div>{{ scope.row.name }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="大小">
            <template slot-scope="scope">
              <span>{{ scope.row.isZipDirectory ? `${'（解压文件夹）' + kbToMb(scope.row.fileSize)}` : kbToMb(scope.row.fileSize) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="修改时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.updateDate).fmtToSecond() }}
            </template>
          </el-table-column>
          <el-table-column prop="updateBy" label="最后编辑人" />
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <div v-if="!scope.row.isDirectory && canPreviewFile(scope.row)" style="display: inline-block; margin-right: 8px">
                <el-tooltip class="item" effect="dark" content="当前文件不支持在线预览，请下载到本地查看预览" placement="top">
                  <el-button type="text" size="small" style="cursor: not-allowed;">
                    <span :class="{ 'read-only' : canPreviewFile(scope.row) }">预览</span>
                  </el-button>
                </el-tooltip>
              </div>
              <el-button v-if="!scope.row.isDirectory && !canPreviewFile(scope.row)" type="text" size="small" @click="previewFile(scope.row)">预览</el-button>
              <el-button type="text" size="small" class="delete" @click="deleteSingleFile(scope.row)">删除</el-button>
              <el-button v-if="permission.includes('file-edit')" type="text" size="small" @click="editorFileName(scope.row)">编辑</el-button>
              <el-button v-if="permission.includes('file-copy') && !scope.row.isZipDirectory" type="text" size="small" @click="copyOrMoveFileTo(scope.row, 'copy')">复制</el-button>
              <el-button v-if="permission.includes('file-move') && !scope.row.isZipDirectory" type="text" size="small" @click="copyOrMoveFileTo(scope.row, 'move')">移动</el-button>
              <el-button type="text" size="small" @click="fileDetail(scope.row)">详情</el-button>
              <el-button v-if="!scope.row.isDirectory" type="text" size="small" @click="downloadFile(scope.row)">下载</el-button>
              <el-button v-if="!scope.row.isDirectory && getFileType(scope.row.name) === 'zip'" type="text" size="small" @click="unzipFile(scope.row)">解压缩</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size.sync="fileInfo.size"
          :total="fileInfo.total"
          :current-page.sync="fileInfo.page"
          style="margin-top: 8px; float:right"
          layout="total, prev, pager, next, sizes"
          @current-change="onPageChange"
          @size-change="onSizeChange"
        />
      </div>

      <!------------------------------- 创建/编辑文件夹弹窗 -------------------------------------------->
      <el-dialog
        :title="fileContentEdit.isNew ? '创建文件夹' : '编辑文件夹/文件信息'"
        :visible.sync="fileContentEdit.show"
        width="460px"
        append-to-body
        @closed="onFileInfoEditorClosed"
      >
        <el-form ref="fileForm" :model="fileContentEdit.form" :rules="fileContentEdit.rules">
          <el-form-item label="名称:" label-width="100px" prop="name">
            <el-input v-model="fileContentEdit.form.name" placeholder="请输入名称（<=50个字符）" maxlength="50" />
          </el-form-item>
          <el-form-item
            v-if="!fileContentEdit.isChildrenFile"
            label="文件夹层级:"
            label-width="100px"
            prop="isTopDirectory"
          >
            <el-radio-group v-model="fileContentEdit.form.isTopDirectory" :disabled="!fileContentEdit.isNew" @change="changeSelect">
              <el-radio :label="1">顶级</el-radio>
              <el-radio :label="0">指定文件夹</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="fileContentEdit.form.showTargetFilePath"
            :class="{ 'read-only' : !fileContentEdit.isNew}"
            label="目标文件夹:"
            label-width="100px"
            prop="targetFilePath"
          >
            <span v-if="fileContentEdit.form.targetFilePath">{{ fileContentEdit.form.targetFilePath }}</span>
            <i class="el-icon-edit" @click="changeSelect(0)" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <ok-cancel-buttons
            :ok-loading="fileContentEdit.formSubmitLoading"
            @ok="onFileInfoEditorOk"
            @cancel="fileContentEdit.show = false"
          />
        </div>
      </el-dialog>

      <!------------------------------------------ 上传文件弹窗 ------------------------------------------------->
      <el-dialog
        title="上传文件"
        :visible.sync="uploadFileDialog.show"
        width="400px"
        append-to-body
        @closed="onUploadFileOkClose"
      >
        <el-form :model="uploadFileDialog.form">
          <el-form-item label="目标文件夹:">
            <div v-if="uploadFileDialog.form.targetFilePath">
              {{ uploadFileDialog.form.targetFilePath }}
              <i class="el-icon-edit" @click="changeSelect(0)" />
            </div>
            <div v-else style="color: #1890ff;cursor: pointer" @click="changeSelect(0)">选择目标文件夹</div>
          </el-form-item>
          <el-form-item>
            <ids-upload
              ref="uploadFile"
              class="upload-file"
              :drag="true"
              action="#"
              :show-file-list="true"
              :multiple="true"
              :file-list="uploadFileDialog.form.fileList"
              :auto-upload="false"
              :limit="8"
              :max-file-size="150"
              :disabled="uploadFileDialog.disabled"
              :on-change="handleChange"
              :on-remove="removeFile"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </ids-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <ok-cancel-buttons
            :ok-loading="uploadFileDialog.formSubmitLoading"
            @ok="onUploadFileOk"
            @cancel="onUploadFileOkCancel"
          />
        </div>
      </el-dialog>

      <!---------------------------------------------- 文件详情弹窗 ------------------------------------------->
      <el-dialog
        :title="'详情' + fileDetailDialog.form.name"
        :visible.sync="fileDetailDialog.show"
        width="460px"
        append-to-body
      >
        <el-form :model="fileDetailDialog.form">
          <el-form-item label="绝对路径:">
            {{ fileDetailDialog.form.path }}
          </el-form-item>
          <el-form-item v-if="fileDetailDialog.form.size" label="文件大小:">
            {{ fileDetailDialog.form.size }}
          </el-form-item>
          <el-form-item v-if="fileDetailDialog.form.type" label="文件类型:">
            {{ fileDetailDialog.form.type }}
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="fileDetailDialog.show = false">关 闭</el-button>
        </div>
      </el-dialog>

      <!---------------------------------- 选择指定文件夹弹窗 ----------------------------------------->
      <file-list-dialog
        ref="dialogFileVisible"
        :title="fileListDialog.fileTitle"
        :file-path="fileListDialog.filePath"
        :select-row="fileListDialog.selectRow"
        @onSelectTargetFileOk="onSelectTargetFileOk"
      />
      <!----------------------------------- 上传文件失败的弹窗 -------------------------------------------->
      <el-dialog
        title="以下文件上传失败"
        :visible.sync="uploadFailDialog.show"
        width="30%"
        @closed="onUploadFailClose"
      >
        <div
          v-for="(item, index) in uploadFailDialog.list"
          :key="index"
          style="margin-bottom: 10px"
        >
          {{ item }}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onUploadFailClose">关 闭</el-button>
        </span>
      </el-dialog>
      <!----------------------------------- 上传文件的进度条 ----------------------------------------------->
      <el-dialog
        title="文件上传"
        :visible.sync="uploadProgressDialog.show"
        width="400px"
        @closed="uploadProgressCancel"
      >
        <div>
          <div
            v-for="item in uploadFileDialog.form.fileList"
            :key="item.uid"
            style="margin-bottom: 10px;"
          >
            <p>{{ item.name }}</p>
            <el-progress :percentage="item.percentage" :status="item.percentage === 100 ? 'success' : null" />
            <p>{{ item.percentage === 100 ? '上传成功' : '' }}</p>
          </div>
        </div>
        <span slot="footer">
          <el-button type="primary" @click="uploadProgressCancel">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Search from './components/Search'
import FileListDialog from './components/FileListDialog.vue'
import IdsUpload from '@/views/components/IdsUpload'
import OkCancelButtons from '@/views/components/OkCancelButtons.vue'
import { fileManagementApi } from '@/api/dataBank/fileManagement'
import '@/utils/datetime'
import permission from '@/views/buttonPermission'
import md5 from 'js-md5'

const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
const searchFileData = () => {
  return {
    name: '',
    department: '',
    filePath: ''
  }
}

const defaultFileEditorForm = () => {
  return {
    name: '',
    filePath: '',
    isTopDirectory: '',
    fileId: '',
    targetFilePath: '',
    showTargetFilePath: false
  }
}
export default {
  components: {
    Search,
    FileListDialog,
    IdsUpload,
    OkCancelButtons
  },
  mixins: [permission],
  data() {
    return {
      showBreadCrumb: false,
      fileInfo: { // 文件夹/文件列表相关信息
        loading: false,
        list: [],
        size: 10,
        total: 0,
        page: 1
      },
      searchQuery: searchFileData(), // 搜索变量
      multipleSelectionFiles: [], // 多选选中的文件夹
      fileContentEdit: { // 创建文件夹的表单
        isNew: false,
        show: false,
        isChildrenFile: false,
        formSubmitLoading: false,
        form: defaultFileEditorForm(),
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          isTopDirectory: [
            { required: true, message: '请选择文件夹层级', trigger: 'blur' }
          ],
          targetFilePath: [
            { required: true, message: '请选择目标文件夹', trigger: 'blur' }
          ]
        }
      },
      fileListDialog: { // 指定文件夹弹窗
        fileTitle: '',
        filePath: '',
        selectRow: {}
      },

      navNameList: [], // 导航列表
      uploadFileDialog: { // 上传文件的数据
        show: false,
        disabled: false,
        formSubmitLoading: false,
        form: {
          currentPath: '',
          targetFilePath: '',
          targetFileId: '',
          fileList: []
        }
      },
      uploadFailDialog: { // 上传失败的文件数据
        show: false,
        list: []
      },

      fileDetailDialog: { // 文件详情的数据
        show: false,
        form: {
          name: '',
          path: '',
          size: '',
          type: ''
        }
      },

      copyOrMoveQuery: { // 复制数据
        resourceFileId: '',
        destinyFileId: ''
      },

      uploadProgressDialog: {
        show: false,
        progress: 0
      },
      type: '', // 类型 移动/复制
      timer: null,
      maxSize: 2 * 1024 * 1024 * 1024, // 2GB
      fileChunkResult: [],
      isZipDirectory: '',
      filePath: '',
      uploadTimer: null
    }
  },
  created() {
    this.getFileInfoList()
  },
  methods: {
    // 文件大小转化
    kbToMb(size) {
      if (size < 1024) {
        return size + 'Kb'
      } else if (size < 1024 * 1024 * 1024 && size >= 1024 * 1024) {
        const fileSize = (size / 1024 / 1024)
        const str = fileSize.toString()
        return str.indexOf('.') === -1 ? fileSize + 'G' : fileSize.toFixed(2) + 'G'
      } else {
        const fileSize = (size / 1024)
        const str = fileSize.toString()
        return str.indexOf('.') === -1 ? fileSize + 'M' : fileSize.toFixed(2) + 'M'
      }
    },
    // 获取文件的后缀
    getFileType(fileName) {
      // , 'py', 'txt', 'csv', 'ipynb', 'pptx', 'jar', 'pyc', 'json', 'log', 'md', 'ttf', 'key', 'gz'
      const fileType = ['pdf', 'rar', 'zip']
      const imgType = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp']
      const index = fileName.lastIndexOf('.')
      const suffix = index === -1 ? '' : fileName.substring(index + 1, fileName.length)
      if (imgType.indexOf(suffix) !== -1) {
        return 'tupian'
      }
      if (['doc', 'docx'].indexOf(suffix) !== -1) {
        return 'word'
      }
      if (['xls', 'xlsx'].indexOf(suffix) !== -1) {
        return 'xlsx'
      }
      if (['mp4'].indexOf(suffix) !== -1) {
        return 'video'
      }
      if (!suffix) {
        return 'document'
      }
      if (fileType.indexOf(suffix) !== -1) {
        return suffix
      } else {
        return 'document'
      }
    },
    // 获取文件信息列表
    async getFileInfoList() {
      this.fileInfo.loading = true
      const data = await fileManagementApi.search({ name: this.searchQuery.name, department: this.searchQuery.department, directoryPath: this.searchQuery.filePath, page: this.fileInfo.page - 1, size: this.fileInfo.size })
      if (!this.searchQuery.filePath) {
        data.content.map(v => {
          this.$set(v, 'isTopDirectory', 1)
          return v
        })
      }
      this.fileInfo.list = data.content
      this.fileInfo.total = data.totalElements
      this.fileInfo.loading = false
    },
    // 获取相应文件夹下的子文件
    async goToSubFile(row) {
      this.fileContentEdit.form.showTargetFilePath = true
      this.fileContentEdit.isChildrenFile = true
      this.fileContentEdit.form.targetFilePath = row.filePath
      this.showBreadCrumb = true
      this.navNameList.push(row)
      this.fileInfo.page = 1
      if (this.searchQuery.name) {
        this.searchQuery.name = ''
      }
      this.searchQuery.filePath = row.filePath
      this.uploadFileDialog.form.targetFilePath = row.filePath
      this.uploadFileDialog.form.targetFileId = row.fileId
      this.uploadFileDialog.form.currentPath = row.filePath
      await this.getFileInfoList()
    },
    // 导航跳转
    clickNav(row, index) {
      if (row.isTopDirectory === 1) {
        this.searchQuery.filePath = ''
        this.fileContentEdit.form.targetFilePath = ''
        this.fileContentEdit.isChildrenFile = false
        this.fileContentEdit.form.showTargetFilePath = false
        this.uploadFileDialog.form.targetFilePath = ''
        this.showBreadCrumb = false
      } else {
        this.uploadFileDialog.form.currentPath = this.uploadFileDialog.form.targetFilePath = this.fileContentEdit.form.targetFilePath = this.searchQuery.filePath = row.filePath.slice(0, (row.filePath.length - row.name.length) - 1)
      }
      this.navNameList.splice(index, this.navNameList.length - index)
      if (this.navNameList.length) {
        this.uploadFileDialog.form.targetFileId = this.navNameList[this.navNameList.length - 1].fileId
      }
      this.getFileInfoList()
    },
    // 主查询
    async onQuery(name) {
      this.searchQuery.name = name
      this.fileInfo.page = 1
      await this.getFileInfoList()
    },
    // 主重置
    async onReset() {
      this.$refs.search.fileName = ''
      // this.searchQuery = searchFileData()
      this.searchQuery.name = ''
      this.searchQuery.department = ''
      this.fileInfo.page = 1
      await this.getFileInfoList()
    },
    // 创建新的文件夹
    onAddFile() {
      this.fileListDialog.selectRow = {}
      this.$refs.fileForm && this.$refs.fileForm.clearValidate()
      this.fileContentEdit.show = true
      this.fileContentEdit.isNew = true
      if (this.fileContentEdit.isChildrenFile) {
        this.fileContentEdit.form.isTopDirectory = 0
      }
    },
    // 文件夹层级切换 顶级/指定文件夹
    changeSelect(label) {
      if (!label) {
        this.fileListDialog.filePath = this.searchQuery.filePath
        this.fileListDialog.fileTitle = '指定文件夹'
        this.$refs.dialogFileVisible.show = true
        this.fileContentEdit.form.showTargetFilePath = true
      } else {
        this.fileContentEdit.form.showTargetFilePath = false
      }
    },
    // 选中的目标文件夹
    async onSelectTargetFileOk(item) {
      this.$refs.dialogFileVisible.show = false
      this.fileContentEdit.form.targetFilePath = item.filePath
      this.uploadFileDialog.form.targetFilePath = item.filePath
      this.uploadFileDialog.form.targetFileId = item.fileId

      // 复制和移动操作
      this.copyOrMoveQuery.destinyFileId = item.fileId
      if (this.type) {
        this.fileAction(this.type, item.isTopDirectory)
      }
    },

    fileAction(type, isTopDirectory) {
      const info = (type === 'copy' ? '复制成功' : '移动成功')
      fileManagementApi[type]({ resourceFileId: this.copyOrMoveQuery.resourceFileId, destinyFileId: isTopDirectory ? '' : this.copyOrMoveQuery.destinyFileId, isTopDirectory: isTopDirectory }).then(() => {
        this.$message.success(info)
        this.getFileInfoList()
      }).catch(err => {
        this.fileContentEdit.form.targetFilePath = this.uploadFileDialog.form.targetFilePath = this.fileListDialog.filePath
        console.log(err)
      })
    },
    // 点击创建文件弹窗的确定
    async onFileInfoEditorOk() {
      this.fileContentEdit.formSubmitLoading = true
      const valid = await new Promise((resolve, reject) => {
        this.$refs.fileForm.validate((valid) => {
          resolve(valid)
        })
      })
      if (!valid) {
        this.fileContentEdit.formSubmitLoading = false
        return
      }
      if (this.fileContentEdit.isNew) {
        if (this.fileContentEdit.form.targetFilePath) {
          this.fileContentEdit.form.filePath = this.fileContentEdit.form.targetFilePath
        }
        fileManagementApi.add({
          name: this.fileContentEdit.form.name,
          filePath: this.fileContentEdit.form.filePath,
          parentDirectory: this.fileContentEdit.form.filePath,
          isTopDirectory: this.fileContentEdit.form.isTopDirectory
        }).then(() => {
          this.fileContentEdit.formSubmitLoading = false
          this.fileContentEdit.show = false
          this.fileInfo.page = 1
          this.getFileInfoList()
        }).catch(() => {
          this.fileContentEdit.formSubmitLoading = false
          this.fileContentEdit.show = true
        })
      } else {
        fileManagementApi.edit({
          name: this.fileContentEdit.form.name,
          fileId: this.fileContentEdit.form.fileId,
          isZipDirectory: this.isZipDirectory,
          filePath: this.filePath
        }).then(() => {
          this.fileContentEdit.formSubmitLoading = false
          this.fileContentEdit.show = false
          this.fileInfo.page = 1
          this.getFileInfoList()
        }).catch(() => {
          this.fileContentEdit.formSubmitLoading = false
          this.fileContentEdit.show = true
        })
      }
    },
    // 创建文件弹窗关闭
    onFileInfoEditorClosed() {
      if (!this.fileContentEdit.isChildrenFile) {
        this.fileContentEdit.form = defaultFileEditorForm()
      } else {
        this.fileContentEdit.form.name = ''
        this.fileContentEdit.form.filePath = ''
        this.fileContentEdit.form.isTopDirectory = ''
        this.fileContentEdit.form.fileId = ''
      }
      this.$refs.fileForm && this.$refs.fileForm.clearValidate()
    },
    // 上传文件
    uploadFile() {
      this.uploadFileDialog.show = true
      this.fileListDialog.selectRow = {}
    },
    // 改变上传文件值
    handleChange(file, fileList) {
      let ret = true
      ret = file.size < this.maxSize
      if (!ret) {
        this.$message.error('文件大小不能超过2GB')
        this.$refs.uploadFile.onRemove(file)
        return
      }
      this.uploadFileDialog.form.fileList.push(file)
    },
    // 移除文件
    removeFile(file) {
      // 移除文件时，要重新给fileList赋值
      const arr = []
      const fileList = this.uploadFileDialog.form.fileList
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].uid !== file.uid) {
          arr.push(fileList[i])
        }
      }
      this.uploadFileDialog.form.fileList = arr
    },
    onUploadFileOk() {
      const list = this.uploadFileDialog.form.fileList
      this.uploadFileDialog.formSubmitLoading = true
      if (!this.uploadFileDialog.form.targetFilePath) {
        this.uploadFileDialog.formSubmitLoading = false
        this.$message.warning('请选择目标文件夹后进行操作')
        return
      }
      if (!list.length) {
        this.uploadFileDialog.formSubmitLoading = false
        this.$message.warning('请选取文件')
        return
      }
      if (list.length > 8) {
        this.uploadFileDialog.formSubmitLoading = false
        this.$message.warning('最多上传8个文件')
        return
      }
      this.uploadProgressDialog.show = true
      this.uploadFileDialog.disabled = true
      list.length > 0 && this.recursionUpload(list, 0)
    },
    async recursionUpload(list, index) {
      let flagChunks = false
      flagChunks = await this.createChunks(list[index], list.length)
      if (flagChunks) {
        index++
        index < list.length && this.recursionUpload(list, index)
      }
    },
    async createChunks(file, length) {
      let flag = false
      const eachSize = 30 * 1024 * 1024 // 每次切片的文件大小 5MB
      const chunks = Math.ceil(file.size / eachSize) // 切片总数
      let start = 0; let end; let chunk = 0 // start: 起始位置 end: 结束位置 chunk: 索引
      while (start < file.size) {
        end = start + eachSize
        if (end > file.size) {
          end = file.size
        }
        // 切割文件
        const formData = new FormData()
        const pieceFile = blobSlice.call(file.raw, start, end, file.type)
        formData.append('chunk', chunk)
        formData.append('chunks', chunks)
        formData.append('fileId', this.uploadFileDialog.form.targetFileId)
        formData.append('lastChunkSign', chunk + 1 === chunks ? 1 : 0)
        formData.append('multipartFile', pieceFile, file.name)
        formData.append('randomFileName', file.uid)
        formData.append('size', file.size)
        if (!this.uploadFileDialog.show) {
          break
        }
        const res = await fileManagementApi.uploadFiles(formData)
        this.uploadFileDialog.form.fileList.map(v => {
          if (v.uid === file.uid) {
            const percentage = Math.ceil(((chunk + 1) / chunks) * 100)
            this.$set(v, 'percentage', percentage)
            return v
          }
        })
        if (chunk + 1 === chunks) {
          flag = true
          this.fileChunkResult.push(res)
          if (res && res.length) {
            this.uploadFailDialog.list.push(res[0])
          }
        }
        start = end
        chunk++
      }
      if (this.fileChunkResult.length === length) {
        const result = this.uploadFailDialog.list
        if (!result.length) {
          this.uploadFileDialog.formSubmitLoading = false
          this.searchQuery.filePath = this.uploadFileDialog.form.currentPath
        } else {
          this.uploadFileDialog.formSubmitLoading = false
        }
        this.uploadTimer = setTimeout(() => {
          if (result.length) {
            this.uploadFailDialog.show = true
          }
          this.uploadProgressDialog.show = false
          this.uploadFileDialog.show = false
          this.getFileInfoList()
        }, 2000)
      }
      return flag
    },
    // 上传进度的取消
    uploadProgressCancel() {
      if (this.uploadFailDialog.list.length) {
        this.uploadFailDialog.show = true
      }
      this.getFileInfoList()
      this.uploadProgressDialog.show = false
      this.uploadFileDialog.show = false
    },
    // 文件失败的关闭
    onUploadFailClose() {
      this.getFileInfoList()
      this.uploadFailDialog.show = false
      this.uploadFailDialog.list = []
    },
    // 文件上传的取消
    onUploadFileOkCancel() {
      this.uploadFileDialog.form.fileList = []
      this.uploadFileDialog.show = false
      this.uploadFileDialog.formSubmitLoading = false
      clearTimeout(this.uploadTimer)
    },
    // 文件上传的关闭
    onUploadFileOkClose() {
      this.fileChunkResult = []
      this.uploadFileDialog.form.fileList = []
      this.uploadFileDialog.show = false
      this.uploadFileDialog.formSubmitLoading = false
      this.uploadFileDialog.disabled = false
    },
    // 获取多选的文件
    handleSelectionChange(val) {
      this.multipleSelectionFiles = val
    },
    // delete操作
    deleteAction(fileIds, filePaths) {
      const h = this.$createElement
      this.$msgbox({
        title: '确定删除该内容？',
        message: h('p', null, [
          h('span', null, '内容可能被引用, 删除后可能影响线上课程, 你还要继续吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            fileManagementApi.deleteFile({ fileIds: fileIds, filePaths: filePaths }).then(() => {
              done()
              instance.confirmButtonLoading = false
              this.getFileInfoList()
            }).catch(() => {
              instance.confirmButtonLoading = false
            })
          } else {
            done()
            this.$refs.fileList.clearSelection()
            this.multipleSelectionFiles = []
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      }).then(action => {
        if (action === 'confirm') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$refs.fileList.clearSelection()
        this.multipleSelectionFiles = []
      })
    },
    // 主删除
    deleteFile() {
      if (!this.multipleSelectionFiles.length) {
        this.$message({
          message: '请选择信息后进行操作',
          type: 'warning'
        })
        return
      }
      const fileIds = this.multipleSelectionFiles.map(v => v.fileId).join()
      const filePaths = this.multipleSelectionFiles.map(v => v.filePath).join()
      this.deleteAction(fileIds, filePaths)
    },

    // 删除单个文件/文件夹
    deleteSingleFile(row) {
      const filePaths = row.filePath
      this.deleteAction(row.fileId, filePaths)
    },
    // 编辑文件/文件夹
    async editorFileName(row) {
      if (!row.isDirectory) {
        this.fileContentEdit.form.name = row.name.slice(0, row.name.lastIndexOf('.'))
      } else {
        this.fileContentEdit.form.name = row.name
      }
      this.fileContentEdit.form.fileId = row.fileId
      this.fileContentEdit.form.isTopDirectory = row.isTopDirectory
      this.isZipDirectory = row.isZipDirectory
      this.filePath = row.filePath
      this.fileContentEdit.isNew = false
      this.fileContentEdit.show = true
    },
    // 复制、移动文件/文件夹
    copyOrMoveFileTo(row, type) {
      this.fileListDialog.selectRow = row
      this.type = type
      this.copyOrMoveQuery.resourceFileId = row.fileId
      this.fileListDialog.fileTitle = (type === 'copy' ? '复制文件夹/文件' : '移动文件夹/文件')
      row.isTopDirectory !== 1 ? this.fileListDialog.filePath = row.filePath.slice(0, row.filePath.lastIndexOf('/')) : this.fileListDialog.filePath = ''
      this.$refs.dialogFileVisible.show = true
    },
    // 查看文件详情
    async fileDetail(row) {
      const data = await fileManagementApi.getFileDetail({ fileId: row.fileId })
      const index = data.name.lastIndexOf('.')
      this.fileDetailDialog.show = true
      this.fileDetailDialog.form.name = index === -1 ? `（ ${data.name} ）` : `（ ${data.name.substring(0, index)} ）`
      this.fileDetailDialog.form.path = data.filePath
      this.fileDetailDialog.form.size = data.isDirectory === 0 ? this.kbToMb(data.fileSize) : ''
      this.fileDetailDialog.form.type = data.isDirectory === 0 ? data.name.substring(index, data.name.length) : ''
    },
    canPreviewFile(row) {
      const index = row.name.lastIndexOf('.')
      const fileType = row.name.substring(index, row.name.length)
      const previewTypeList = ['.mp4', '.txt', '.log', '.pdf', '.bmp', '.jpg', '.jpeg', '.png', '.svg', '.gif']
      if (previewTypeList.indexOf(fileType) === -1) {
        return true
      }
      return false
    },
    // 预览文件
    previewFile(row) {
      const path = '/data/course_data/'
      const url = `${process.env.VUE_APP_BASE_API}/referenceFile/view/${row.filePath.slice(path.length)}`
      window.open(url)
    },
    // 下载文件
    downloadFile(row) {
      const path = '/data/course_data/'
      window.location.href = `${process.env.VUE_APP_BASE_API}/referenceFile/download/${row.filePath.slice(path.length)}`
    },
    // 换页
    async onPageChange() {
      await this.getFileInfoList()
    },
    // 换展示的数据
    async onSizeChange() {
      await this.getFileInfoList()
    },
    // 解压缩zip文件
    async unzipFile(row) {
      const formData = new FormData()
      const parentDirectory = this.navNameList[this.navNameList.length - 1].filePath
      const fileId = this.navNameList[this.navNameList.length - 1].fileId
      const index = row.name.lastIndexOf('.')
      const name = row.name.substring(0, index)
      const fileMd5 = md5(row.filePath)
      formData.append('fileId', fileId)
      formData.append('filePath', parentDirectory)
      formData.append('isTopDirectory', false)
      formData.append('isZipDirectory', 1)
      formData.append('name', name)
      formData.append('parentDirectory', parentDirectory)
      formData.append('zipFileId', row.fileId)
      formData.append('zipFileName', row.name)
      formData.append('md5', fileMd5)
      const data = await fileManagementApi.unzip(formData) // 解压文件
      this.fileInfo.loading = true
      if (!data) { // 查询解压的状态
        this.timer = setInterval(() => {
          const formMd5 = new FormData()
          formMd5.append('fileMd5', fileMd5)
          fileManagementApi.unzipStatus(formMd5).then(res => {
            switch (res) {
              case 0:
                this.fileInfo.loading = true
                break
              case 1:
                this.$message.success('解压缩成功')
                this.getFileInfoList()
                clearInterval(this.timer)
                break
              default:
                clearInterval(this.timer)
                this.fileInfo.loading = false
                this.$message.error('解压缩失败')
                break
            }
          }).catch(() => {
            clearInterval(this.timer)
            this.fileInfo.loading = false
          })
        }, 1000)
      } else {
        this.fileInfo.loading = false
        this.$message.error('文件已被解压')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.file-list {
  height: 100%;
  .breadcrumb {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    overflow: hidden;
    position: relative;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,0.08);
    box-shadow: 0 1px 4px rgba(0,21,41,0.08);
    div {
      margin-right: 5px;
      cursor: pointer;
    }
  }
  // .file-wrapper {
  //   background: #F5F6FA;
  /deep/ .app-container {
    // background: #F5F6FA;
    .file-search {
      padding: 20px 30px;
      background: #FFFFFF;
      box-shadow: 0px 0px 10px 0px #EAEEFF;
      border-radius: 6px;
    }
    .file-section {
      margin-top: 24px;
      background: #FFFFFF;
      box-shadow: 0px 0px 10px 0px #EAEEFF;
      border-radius: 6px;
      padding: 40px 30px 80px;
      .file-header {
        margin-bottom: 30px;
        .el-button--success {
          background-color: #67C23A;
          border-color: #67C23A;
          color: #FFF;
        }
      }
      .el-pagination {
        padding-top: 16px;
      }
    }
  }
}
.el-upload__text {
  p {
    margin: 0;
  }
}
.read-only {
  display: inline-block;
  pointer-events: none;
  color: #C0C4CC;
  cursor: not-allowed;
}
.file-name {
  display: flex;
  div {
    margin-left: 10px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .icon {
    width: 15px;
    height: 13px;
    position: relative;
    top: 5px;
  }
}
.delete {
  color: #F56C6C;
}
</style>
