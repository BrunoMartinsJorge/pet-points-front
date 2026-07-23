import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Popover } from 'primeng/popover';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { titlecasePipe } from '../../pipes/texto-format-pipe';

@NgModule({
  providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectModule,
    SplitButtonModule,
    ReactiveFormsModule,
    FieldsetModule,
    FormsModule,
    DatePickerModule,
    TextareaModule,
    FileUploadModule,
    ToastModule,
    BadgeModule,
    OverlayBadgeModule,
    TooltipModule,
    TabsModule,
    InputNumberModule,
    CardModule,
    Popover,
    ToggleSwitch,
    SkeletonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    PasswordModule,
    DataViewModule,
    ConfirmDialogModule,
    titlecasePipe,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectModule,
    SplitButtonModule,
    ReactiveFormsModule,
    FieldsetModule,
    FormsModule,
    DatePickerModule,
    TextareaModule,
    FileUploadModule,
    ToastModule,
    BadgeModule,
    OverlayBadgeModule,
    TooltipModule,
    TabsModule,
    InputNumberModule,
    CardModule,
    Popover,
    ToggleSwitch,
    SkeletonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    PasswordModule,
    DataViewModule,
    ConfirmDialogModule,
    titlecasePipe,
  ],
})
export class PrimeNGModule {}
