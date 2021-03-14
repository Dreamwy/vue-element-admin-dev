<template>
  <div class="components-container">
    <el-select
      ref="select"
      v-model="value"
      placeholder="请选择"
      style="
        width: 200px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 10px;
      "
    >
      <el-option
        v-for="item in tabMapOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button
      type="primary"
      style="
        width: 200px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 10px;
      "
      @click="dialogTableVisible = true"
    >
      新增
    </el-button>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="酒店id"
        width="150"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="酒店名称">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="省">
        <template slot-scope="{ row }">
          <span>{{ row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="市">
        <template slot-scope="{ row }">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="详细地址">
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="支付方式">
        <template slot-scope="{ row }">
          <span>{{ row.payway | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogTableVisible" title="新增酒店">
      <!-- <el-select ref="select" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        class="form-container"
      >
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="postForm.name" autocomplete="off" width="100px" />
        </el-form-item>
        <el-form-item label="省市:" :label-width="formLabelWidth">
          <area-select
            v-model="selected"
            :data="pca"
            type="text"
            height="100px"
          />
        </el-form-item>
        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input
            v-model="postForm.address"
            autocomplete="off"
            width="100px"
          />
        </el-form-item>
        <el-form-item label="付款方式:" :label-width="formLabelWidth">
          <el-select v-model="postForm.payway" placeholder="付款方式">
            <el-option label="扫码单独使用" value="1" />
            <el-option label="包含房费内" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        v-loading="loading"
        style="margin-left: 10px"
        type="success"
        @click="submitForm"
      >
        添加
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { addHotel, getHotel, delHotel } from '@/api/article'
import { pca, pcaa } from 'area-data'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      if (type === '1') {
        return '扫码单独使用'
      } else if (type === '2') {
        return '包含房费内'
      }
      return '扫码单独使用'
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      postForm: Object.assign({}),
      dialogTableVisible: false,
      list: null,
      listQuery: {
        page: 0,
        size: 20,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      selected: [],
      pca: pca,
      pcaa: pcaa
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      getHotel(this.listQuery).then((response) => {
        this.list = response.rows
        console.log('!!!!!' + JSON.stringify(response))
        this.loading = false
      })
    },
    submitForm() {
      this.loading = true
      this.postForm.province = this.selected[0]
      this.postForm.city = this.selected[1]
      console.log(this.postForm)
      addHotel(this.postForm).then((response) => {
        this.loading = false
        this.dialogTableVisible = false
        this.getList()
      })
    },
    handleDelete(row) {
      console.log('!!!!!' + JSON.stringify(row))
      delHotel({ id: row.id }).then((response) => {
        this.getList()
      })
    }
  }
}
</script>
